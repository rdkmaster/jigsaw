import {
    Component, Input, NgModule, ComponentFactoryResolver, AfterViewInit, ViewChild, Type, ChangeDetectorRef, ElementRef,
    Renderer2, OnInit, ComponentRef, Output, EventEmitter, ViewChildren, QueryList, forwardRef, OnDestroy, Optional,
    TemplateRef, EmbeddedViewRef
} from "@angular/core";
import {CommonModule} from "@angular/common";

import {RdkRendererHost, AbstractRDKComponent} from "../core";
import {TableData} from "../../core/data/table-data";
import {
    TableCellRenderer, ColumnDefine, AdditionalColumnDefine, TableDataChangeEvent,
    TableHeadChangeEvent
} from "./table-api";

import {RdkScrollBarModule} from "../scrollbar/scrollbar";
import {RdkScrollBar} from "../scrollbar/scrollbar";
import {SortAs, SortOrder, CallbackRemoval} from "../../core/data/component-data";
import {AffixUtils} from "../../core/utils/internal-utils";
import {TableCheckboxService} from "./table-service";
import {DefaultCellRenderer} from "./table-renderer";
import {RdkTooltipModule, SimpleTooltipComponent} from "../tooltip/tooltip";
import {CommonUtils} from "../../core/utils/common-utils";
import {PopupEffect, PopupInfo, PopupPositionType, PopupService} from "../../service/popup.service";

class HeadSetting {
    cellData: string | number;
    width: string | number;
    visible: boolean;
    renderer: Type<TableCellRenderer> | TemplateRef<any>;
    class: string;
    sortable: boolean;
    sortAs: SortAs;
    defaultSortOrder: SortOrder;
    field: number;
}

class CellSetting {
    cellData: string | number;
    width: string | number;
    visible: boolean;
    renderer: Type<TableCellRenderer> | TemplateRef<any>;
    class: string;
    editable: boolean;
    editorRenderer: Type<TableCellRenderer> | TemplateRef<any>;
    group: boolean;
    field: number;
    rowSpan: number;
}

type SortChangeEvent = {
    sortAs: SortAs,
    order: SortOrder,
    field: number
}

type RemoveTdListener = {
    removeTdListener: Function,
    row: number,
    column: number
}

@Component({
    selector: 'rdk-table',
    templateUrl: 'table.html',
    styleUrls: ['table.scss'],
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height'
    },
    providers: [TableCheckboxService]
})
export class RdkTable extends AbstractRDKComponent implements AfterViewInit, OnDestroy, OnInit {
    private _data: TableData;
    private _removeRefreshCallback: CallbackRemoval;
    private _hasInit: boolean; //组件是否已初始化

    @Input()
    public get data(): TableData {
        return this._data
    }

    public set data(value: TableData) {
        if (!(value instanceof TableData)) return;
        this._data = value;

        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
        }
        this._removeRefreshCallback = value.onRefresh(() => {
            this._refresh();
        });

        if (this._hasInit) {
            this._refresh();
        }
    };

    @Output() public dataChange = new EventEmitter<TableDataChangeEvent>();

    private _columnDefines: ColumnDefine[];

    @Input()
    public get columnDefines(): ColumnDefine[] {
        return this._columnDefines;
    }

    public set columnDefines(value: ColumnDefine[]) {
        if (this.columnDefines != value) {
            this._columnDefines = value;
            if (this._hasInit) {
                this._refresh();
            }
        }
    }

    private _additionalColumnDefines: AdditionalColumnDefine[];

    @Input()
    public get additionalColumnDefines(): AdditionalColumnDefine[] {
        return this._additionalColumnDefines;
    }

    public set additionalColumnDefines(value: AdditionalColumnDefine[]) {
        if (this.additionalColumnDefines != value) {
            this._additionalColumnDefines = value;
            if (this._hasInit) {
                this._refresh();
            }
        }
    }

    public static ROW_HEIGHT: number = 30;

    private _scrollBarOptions: any = {
        snapAmount: RdkTable.ROW_HEIGHT,
        mouseWheel: {enable: true, scrollAmount: RdkTable.ROW_HEIGHT * 3}
    };

    @Input()
    public set scrollAmount(value: number) {
        if (typeof value == 'number' && value > 0) {
            this._scrollBarOptions = {
                snapAmount: RdkTable.ROW_HEIGHT,
                mouseWheel: {enable: true, scrollAmount: RdkTable.ROW_HEIGHT * value}
            };
        }
    }

    public get scrollAmount(): number {
        return this._scrollBarOptions.mouseWheel.scrollAmount;
    }

    @Input() public lineEllipsis;

    private _fixedHead: HTMLElement;

    private _headSettings: Array<HeadSetting> = [];

    private _cellSettings: Array<CellSetting>[] = [];

    private _removeTdListeners: Array<RemoveTdListener> = [];

    private _removeWindowResizeListener: Function;
    private _removeWindowScrollListener: Function;
    private _removeWindowLoadListener: Function;

    @ViewChild(RdkScrollBar) private _scrollBar: RdkScrollBar;

    @ViewChildren('header', {read: ElementRef})
    private _headers: QueryList<ElementRef>;

    @ViewChildren('fixedHeader', {read: ElementRef})
    private _fixedHeaders: QueryList<ElementRef>;

    @ViewChildren('tableRow', {read: ElementRef})
    private _rows: QueryList<ElementRef>;

    @ViewChildren(forwardRef(() => RdkTableHeader))
    private _rdkTableHeaders: QueryList<RdkTableHeader>;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef, private _popupService: PopupService) {
        super()
    }

    public rendererList: any[] = [];

    public getRenderers(column) {
        return this.rendererList.filter(renderer => renderer.column == column);
    }

    private _beforeRefresh() {
        this._renderer.addClass(this._fixedHead, 'rdk-table-hide');
    }

    /*
     * 重新渲染
     * */
    private _refresh() {
        this._beforeRefresh();
        this._transformData();
        this._refreshStyle();
    }

    /*
     * 初始化_headSettings
     * */
    private _initHeadSettings(): void {
        this._headSettings = [];
        this.data.header.forEach((cellData, index) => {
            this._headSettings.push({
                cellData: cellData,
                width: null,
                visible: true,
                renderer: null,
                class: '',
                sortable: false,
                sortAs: SortAs.string,
                defaultSortOrder: SortOrder.default,
                field: index
            })
        });
    }

    /*
     * 初始化_cellSettings
     * */
    private _initCellSettings(): void {
        this._cellSettings = [];
        this.data.data.forEach(row => {
            let cellSettings = [];
            row.forEach((cellData, index) => {
                //TODO 性能热点
                cellSettings.push({
                    cellData: cellData,
                    visible: true,
                    renderer: null,
                    class: '',
                    editable: false,
                    editorRenderer: null,
                    group: false,
                    field: index,
                    rowSpan: 1
                })
            });
            this._cellSettings.push(cellSettings);
        });
    }

    /*
     * 列定义数据转换
     * */
    private _transformColumns(cb: Function): void {
        if (!this._columnDefines) return;
        this._columnDefines.forEach(column => {
            if (column.target instanceof Function) {
                let fields = this.data.field.filter(column.target);
                fields.forEach(field => {
                    cb.call(this, this.data.field.indexOf(field), column);
                })
            }
            else if (column.target instanceof Array) {
                const a: (string | number)[] = column.target;
                a.forEach(targetItem => {
                    if (typeof targetItem === 'number') {
                        cb.call(this, targetItem, column);
                    } else if (typeof targetItem === 'string') {
                        cb.call(this, this.data.field.indexOf(targetItem), column);
                    }
                })
            }
            else if (typeof column.target === 'number') {
                cb.call(this, column.target, column);
            } else if (typeof column.target === 'string') {
                cb.call(this, this.data.field.indexOf(column.target), column);
            }
        });
    }

    /*
     * 其他列定义数据转换
     * */
    private _transformAdditionalColumns(insertClone: Function, insert: Function): void {
        if (!this._additionalColumnDefines) return;
        this._additionalColumnDefines.forEach(additionalColumn => {
            let pos = additionalColumn.pos;
            const target = additionalColumn.field;
            pos = pos >= 0 && pos < this.data.header.length ? pos : -1;
            target ? insertClone.call(this, pos, target, additionalColumn) : insert.call(this, pos, additionalColumn);
        });
    }

    /*
     * 过滤掉不显示的列头
     * */
    private _filterHeadSettings(): void {
        this._headSettings = this._headSettings ? this._headSettings.filter(headSetting => headSetting.visible) : null;
    }

    /*
     * 过滤掉不显示的列
     * */
    private _filterCellSettings(): void {
        if (this._cellSettings) {
            this._cellSettings.forEach((cellSettings, index) => {
                this._cellSettings[index] = cellSettings.filter(cellSetting => cellSetting.visible);
            });
        }
    }

    /*
     * cellSetting设置rowSpan
     * */
    private _setRowSpan(rowSpans, rowSpan, colIndex, cellSetting) {
        if (rowSpans[colIndex] === undefined) {
            rowSpans.push(rowSpan);
        } else {
            rowSpans[colIndex] = rowSpan;
        }
        cellSetting.rowSpan = rowSpan;
    }

    /*
     * 列检查合并单元格
     * */
    private _checkRowSpan(rowSpans, rowSpan, rowIndex, colIndex, cellSetting) {
        for (let i = 0; i < this._cellSettings.length - rowIndex - 1; i++) {
            if (this._cellSettings[rowIndex + i + 1][colIndex].cellData == cellSetting.cellData) {
                rowSpan += 1;
                if (i == this._cellSettings.length - rowIndex - 2) {
                    this._setRowSpan(rowSpans, rowSpan, colIndex, cellSetting);
                }
            } else {
                this._setRowSpan(rowSpans, rowSpan, colIndex, cellSetting);
                break;
            }
        }
    }

    /*
     * 合并单元格
     * */
    private _mergeCellWithGroup(): void {
        let rowSpans: number[] = [];
        this._cellSettings.forEach((cellSettings, rowIndex) => {
            cellSettings.forEach((cellSetting, colIndex) => {
                let rowSpan: number = 1;
                if (rowIndex == 0) {
                    if (cellSetting.group) {
                        this._checkRowSpan(rowSpans, rowSpan, rowIndex, colIndex, cellSetting);
                    } else {
                        rowSpans.push(1);
                        cellSetting.rowSpan = 1;
                    }
                } else {
                    if (!cellSetting.group) {
                        cellSetting.rowSpan = 1;
                    } else if (rowSpans[colIndex] != 1) {
                        rowSpans[colIndex] -= 1;
                        cellSetting.rowSpan = 0;
                    } else {
                        this._checkRowSpan(rowSpans, rowSpan, rowIndex, colIndex, cellSetting);
                    }
                }

            })
        })
    }

    /*
     * 原始数据排序
     * */
    private _dataDefaultSort() {
        if (this._headSettings) {
            //默认按第一个排序
            let headSetting = this._headSettings.find(headSetting => headSetting.sortable &&
                (headSetting.defaultSortOrder == SortOrder.asc || headSetting.defaultSortOrder == SortOrder.des)
            );
            if (headSetting) {
                this.data.sort(headSetting.sortAs, headSetting.defaultSortOrder, headSetting.field);
            }
        }
    }

    /*
     * 转换headSettings,渲染head
     * */
    private _transformHeadSettings() {
        //初始化Settings
        this._initHeadSettings();
        //列定义数据转换
        this._transformColumns(this._mergeHeadSetting);
        //其他列定义数据转换
        this._transformAdditionalColumns(this._insertCloneHeadSettings, this._insertHeadSetting);
        //过滤掉不显示的列头
        this._filterHeadSettings();
    }

    /*
     * 转换cellSettings,渲染cell
     * */
    private _transformCellSettings() {
        //初始化Settings
        this._initCellSettings();
        //列定义数据转换
        this._transformColumns(this._mergeCellSetting);
        //其他列定义数据转换
        this._transformAdditionalColumns(this._insertCloneCellSettings, this._insertCellSetting);
        //过滤掉不显示的列
        this._filterCellSettings();
        //合并单元格
        this._mergeCellWithGroup();
    }

    /*
     * 执行默认排序，data和columns数据合并转换，生成headSettings和cellSettings，渲染head和cell
     * */
    private _transformData(): void {
        this._transformHeadSettings();
        this._dataDefaultSort();
        this._transformCellSettings();
    }

    /*
     * 根据column修改表头列数据
     * */
    private _mergeHeadSetting(index, column: ColumnDefine): void {
        if (index >= 0 && index < this.data.header.length) {
            this._generateHeadSetting(this._headSettings[index], column);
        }
    }

    /*
     * 根据column修改单元格列数据
     * */
    private _mergeCellSetting(index, column: ColumnDefine): void {
        if (index >= 0 && index < this.data.header.length) {
            this._cellSettings.forEach(cellSettings => {
                this._generateCellSetting(cellSettings[index], column);
            });
        }
    }

    /*
     * 根据元素在field的index找到在headSettings中的index
     * */
    private _getIndexInHeadSettings(pos): number {
        let index = null;
        for (let i = 0; i < this._headSettings.length; i++) {
            if (this._headSettings[i].field == pos) {
                index = i;
                break;
            }
        }
        return index;
    }

    /*
     * 根据元素在field的index找到在cellSettings中的index
     * */
    private _getIndexInCellSettings(pos): number {
        let index = null;
        for (let i = 0; i < this._cellSettings[0].length; i++) {
            if (this._cellSettings[0][i].field == pos) {
                index = i;
                break;
            }
        }
        return index;
    }

    /*
     * 根据target找到在field中的位置
     * */
    private _getPosInField(target: string | number): number {
        let pos: number;
        if (typeof target === 'number') {
            pos = target;
        } else if (typeof target === 'string') {
            pos = this.data.field.indexOf(target);
        }
        return pos;
    }

    /*
     * 移动列头位置
     * */
    private _insertCloneHeadSettings(pos: number, target: string | number, additionalColumn: AdditionalColumnDefine) {
        let index = this._getIndexInHeadSettings(this._getPosInField(target));

        //插入列头
        let headSetting: HeadSetting = {
            cellData: this._headSettings[index].cellData,
            width: null,
            visible: true,
            renderer: null,
            class: '',
            sortable: false,
            sortAs: SortAs.string,
            defaultSortOrder: SortOrder.default,
            field: this._headSettings[index].field
        };
        this._insertHeadSetting(pos, additionalColumn, headSetting);
    }

    /*
     * 移动列位置
     * */
    private _insertCloneCellSettings(pos: number, target: string | number, additionalColumn: AdditionalColumnDefine) {
        let index = this._getIndexInCellSettings(this._getPosInField(target));

        //插入列
        this._cellSettings.forEach(cellSettings => {
            let cellSetting: CellSetting = {
                cellData: cellSettings[index].cellData,
                width: null,
                visible: true,
                renderer: null,
                class: '',
                editable: false,
                editorRenderer: null,
                group: false,
                field: cellSettings[index].field,
                rowSpan: 1
            };
            this._insertCellSetting(pos, additionalColumn, cellSetting, cellSettings);
        })
    }

    /*
     * 插入表头列
     * */
    private _insertHeadSetting(pos, additionalColumn: AdditionalColumnDefine): void
    private _insertHeadSetting(pos, additionalColumn: AdditionalColumnDefine, headSetting?: HeadSetting): void
    private _insertHeadSetting(pos, additionalColumn: AdditionalColumnDefine, headSetting?: HeadSetting): void {
        headSetting = headSetting ? headSetting : {
            cellData: '',
            width: null,
            visible: true,
            renderer: null,
            class: '',
            sortable: false,
            sortAs: SortAs.string,
            defaultSortOrder: SortOrder.default,
            field: -1 //-1代表插入列
        };
        headSetting = this._generateHeadSetting(headSetting, additionalColumn);
        if (pos != -1) {
            const index = this._headSettings.indexOf(this._headSettings.find(headSetting => headSetting.field == pos));
            this._headSettings.splice(index, 0, headSetting);
        } else {
            this._headSettings.push(headSetting)
        }
    }

    /*
     * 插入单元格列
     * */
    private _insertCellSetting(pos, additionalColumn: AdditionalColumnDefine): void
    private _insertCellSetting(pos, additionalColumn: AdditionalColumnDefine, cellSetting?: CellSetting, cellSettings?: CellSetting[]): void
    private _insertCellSetting(pos, additionalColumn: AdditionalColumnDefine, cellSetting?: CellSetting, cellSettings?: CellSetting[]): void {
        cellSetting = cellSetting ? cellSetting : {
            cellData: '',
            width: null,
            visible: true,
            renderer: null,
            class: '',
            editable: false,
            editorRenderer: null,
            group: false,
            field: -1, //-1代表插入列
            rowSpan: 1
        };
        cellSetting = this._generateCellSetting(cellSetting, additionalColumn);

        if (!cellSettings) {
            if (pos != -1) {
                this._cellSettings.forEach((cellSettings) => {
                    const index = cellSettings.indexOf(cellSettings.find(cellSetting => cellSetting.field == pos));
                    cellSettings.splice(index, 0, cellSetting);
                })
            } else {
                this._cellSettings.forEach((cellSettings) => {
                    cellSettings.push(cellSetting);
                })
            }
        } else {
            if (pos != -1) {
                const index = cellSettings.indexOf(cellSettings.find(cellSetting => cellSetting.field == pos));
                cellSettings.splice(index, 0, cellSetting);
            } else {
                cellSettings.push(cellSetting);
            }
        }
    }

    /*
     * 根据column的数据生成headSetting，支持多个column数据的合并
     * */
    private _generateHeadSetting(headSetting: HeadSetting,
                                 column: ColumnDefine | AdditionalColumnDefine): HeadSetting {
        headSetting.width = column.width ? column.width : headSetting.width;
        headSetting.visible = column.visible === true || column.visible === false ? column.visible : headSetting.visible;

        const header = column.header;
        if (header) {
            headSetting.cellData = header.text ? header.text : headSetting.cellData;
            headSetting.renderer = header.renderer ? header.renderer : headSetting.renderer;
            headSetting.class = typeof header.class == 'string' && header.class !== '' ? headSetting.class + " " + header.class : headSetting.class;
            headSetting.sortable = header.sortable === true || header.sortable === false ? header.sortable : headSetting.sortable;
            headSetting.sortAs = header.sortAs !== null && header.sortAs !== undefined ? header.sortAs : headSetting.sortAs;
            headSetting.defaultSortOrder = header.defaultSortOrder !== null && header.defaultSortOrder !== undefined ?
                header.defaultSortOrder : headSetting.defaultSortOrder;
        }
        return headSetting;
    }

    /*
     * 根据column的数据生成cellSetting，支持多个column数据的合并
     * */
    private _generateCellSetting(cellSetting: CellSetting,
                                 column: ColumnDefine | AdditionalColumnDefine): CellSetting {
        cellSetting.width = column.width ? column.width : cellSetting.width;
        cellSetting.visible = column.visible === true || column.visible === false ? column.visible : cellSetting.visible;
        cellSetting.group = column.group === true || column.group === false ? column.group : cellSetting.group;
        const cell = column.cell;
        if (cell) {
            cellSetting.renderer = cell.renderer ? cell.renderer : cellSetting.renderer;
            cellSetting.class = typeof cell.class == 'string' && cell.class !== '' ? cellSetting.class + " " + cell.class : cellSetting.class;
            cellSetting.editable = cell.editable === true || cell.editable === false ? cell.editable : cellSetting.editable;
            cellSetting.editorRenderer = cell.editorRenderer ? cell.editorRenderer : cellSetting.editorRenderer;

            //单元格有editorRenderer,没有renderer时，指定默认renderer
            if (cellSetting.editorRenderer && !cellSetting.renderer) {
                cellSetting.renderer = DefaultCellRenderer;
            }
        }
        return cellSetting;
    }

    private _setFixedHeadWidth(): void {
        const hostWidth = this._elementRef.nativeElement.offsetWidth + 'px';
        this._renderer.setStyle(this._elementRef.nativeElement.querySelector('.rdk-table'), 'width', hostWidth);

        const tableWidth = this._elementRef.nativeElement.querySelector('.rdk-table').offsetWidth + 'px';
        this._renderer.setStyle(this._elementRef.nativeElement.querySelector('.rdk-table-fixed-head'), 'width', tableWidth);
        this._renderer.setStyle(
            this._elementRef.nativeElement.querySelector('.rdk-table-box .mCSB_container:first-child'), 'width', tableWidth);
        this._fixedHeaders.forEach((fixedHeader, index) => {
            this._renderer.setStyle(fixedHeader.nativeElement, 'width',
                this._headers.toArray()[index].nativeElement.offsetWidth + 'px');
        });

        this._renderer.removeClass(this._fixedHead, 'rdk-table-hide');
    }

    /**
     * 设置单元格内容的宽度，如果内容超过宽度，并且设置了行省略，则使用'...'+tooltip的形式显示
     * @private
     */
    private _setCellLineEllipsis() {
        //不设置省略功能，就不需要设置单元格宽度
        if (!this.lineEllipsis) return;

        //清空之前的td-tooltip事件
        this._removeAllTdListeners();
        this._removeTdListeners = [];

        const hostWidth = this._elementRef.nativeElement.offsetWidth;
        this._rows.forEach((row, rowIndex) => {
            const elements: NodeListOf<Element> = row.nativeElement.querySelectorAll('.cell-content');
            for (let colIndex = 0; colIndex < elements.length; ++colIndex) {
                const element: Element = elements[colIndex];
                const cellSetting: CellSetting = this._cellSettings[rowIndex][colIndex];
                //没有渲染器或者用DefaultCellRenderer的单元格才能用省略
                if (!cellSetting.renderer || cellSetting.renderer == DefaultCellRenderer) {
                    let width = CommonUtils.getCssValue(cellSetting.width);
                    if (width.match(/^\s*\d+%\s*$/)) {
                        width = hostWidth * Number(width.replace(/%/, '')) / 100 + 'px';
                        this._renderer.setStyle(element, 'width', width);
                    } else {
                        this._renderer.setStyle(element, 'width', width);
                    }

                    const cellText: HTMLElement = <HTMLElement>element.querySelector('span.rdk-table-cell-text');
                    if (cellText && cellText.offsetWidth > Number(width.replace(/px/, ''))) {
                        this._addTdTooltipListener(element.parentElement, cellSetting.cellData, rowIndex, colIndex)
                    }
                }
            }
        })
    }

    private _tooltipInfo: PopupInfo;
    private _addTdTooltipListener(tdElement: HTMLElement, message: string | number, rowIndex: number, colIndex: number) {
        const removeTdMouseEnterListener = this._renderer.listen(tdElement, "mouseenter", () => {
            if (!this._tooltipInfo) {
                this._tooltipInfo = this._popupService.popup(SimpleTooltipComponent, {
                    modal: false, //是否模态
                    showEffect: PopupEffect.bubbleIn,
                    hideEffect: PopupEffect.bubbleOut,
                    pos: tdElement,
                    posOffset: { //偏移位置
                        bottom: -8,
                        left: 0
                    },
                    posType: PopupPositionType.absolute, //定位类型
                }, {
                    message: message
                });
            }
        });

        const removeTdMouseLeaveListener = this._renderer.listen(tdElement, "mouseleave", () => {
            this._removeTooltip();
        });

        this._removeTdListeners.push({removeTdListener: removeTdMouseEnterListener, row: rowIndex, column: colIndex});
        this._removeTdListeners.push({removeTdListener: removeTdMouseLeaveListener, row: rowIndex, column: colIndex});
    }

    private _removeTooltip(){
        if (this._tooltipInfo) {
            this._tooltipInfo.dispose();
            this._tooltipInfo = null;
        }
    }

    public _rebindTooltipForCell(element: HTMLElement, message: any, rowIndex: number, colIndex: number){
        //删除对应td的tooltip的事件
        this._removeTdListenersByIndex(rowIndex, colIndex);
        //重新绑定td的tooltip
        const cellText: HTMLElement = <HTMLElement>element.querySelector('span.rdk-table-cell-text');
        if (cellText && cellText.offsetWidth > element.offsetWidth) {
            this._addTdTooltipListener(element.parentElement, message, rowIndex, colIndex);
        }
    }

    private _removeAllTdListeners() {
        if (this._removeTdListeners.length) {
            this._removeTdListeners.forEach(removeTdListener => removeTdListener.removeTdListener())
        }
    }

    private _removeTdListenersByIndex(row: number, column: number) {
        if (this._removeTdListeners.length) {
            this._removeTdListeners
                .filter(removeTdListener => removeTdListener.row == row
                && removeTdListener.column == column)
                .forEach(removeTdListener => removeTdListener.removeTdListener())
        }
    }

    private _whileScrolling(): void {
        this._scrollBar.whileScrolling.subscribe(scrollEvent => {
            this._removeTooltip();
            if (scrollEvent.direction == 'x') {
                this._renderer.setStyle(this._fixedHead, 'left', scrollEvent.left + 'px');
            }
        });
    }

    private _floatHead() {
        const maxTop = this._elementRef.nativeElement.offsetHeight - this._fixedHead.offsetHeight;
        let tableDocumentTop = AffixUtils.offset(this._elementRef.nativeElement).top;
        let scrollTop = AffixUtils.getScrollTop();
        let top = scrollTop - tableDocumentTop;
        if (top > 0 && top < maxTop) {
            this._renderer.setStyle(this._fixedHead, 'top', top + 'px');
        } else if (top <= 0) {
            this._renderer.setStyle(this._fixedHead, 'top', '0px');
        } else if (top >= maxTop) {
            this._renderer.setStyle(this._fixedHead, 'top', maxTop);
        }
    }

    /**
     * 手动设置固定表头的宽度
     * @private
     */
    public _asyncSetFixedHeadWidth() {
        setTimeout(() => {
            this._setFixedHeadWidth();
        }, 0);

        setTimeout(() => {
            this._setFixedHeadWidth();
        }, 1000);
    }

    private _asyncSetCellLineEllipsis() {
        setTimeout(() => {
            this._setCellLineEllipsis();
        }, 0);
    }

    private _addWindowListener() {
        this._removeWindowListener();

        this._removeWindowLoadListener = this._renderer.listen('window', 'load', () => {
            this._setCellLineEllipsis();
            this._setFixedHeadWidth();
        });
        this._removeWindowResizeListener = this._renderer.listen('window', 'resize', () => {
            this._setCellLineEllipsis();
            this._setFixedHeadWidth();
            this._floatHead();
            this._scrollBar.scrollTo([null, 'left']);
            this._renderer.setStyle(this._fixedHead, 'left', 0);
        });
        this._removeWindowScrollListener = this._renderer.listen('window', 'scroll', () => {
            this._floatHead();
        });
    }

    private _removeWindowListener() {
        if (this._removeWindowLoadListener) {
            this._removeWindowLoadListener();
        }
        if (this._removeWindowScrollListener) {
            this._removeWindowScrollListener();
        }
        if (this._removeWindowResizeListener) {
            this._removeWindowResizeListener();
        }
    }

    private _subscribeSortChange() {
        setTimeout(() => {
            this._rdkTableHeaders.length && this._rdkTableHeaders.forEach(rdkTableHeaders => {
                rdkTableHeaders.sortChange.subscribe(value => {
                    this.data.sort(value.sortAs, value.order, value.field);
                    this._transformCellSettings();
                })
            })
        }, 0);
    }

    private _refreshStyle() {
        this._asyncSetCellLineEllipsis();
        this._asyncSetFixedHeadWidth();
        this._addWindowListener();
        this._subscribeSortChange();
    }

    private _init() {
        this._renderer.setStyle(this._elementRef.nativeElement.querySelector('.rdk-table-box'),
            'max-height', this._maxHeight);
        this._fixedHead = this._elementRef.nativeElement.querySelector(".rdk-table-fixed-head");

        if (this.lineEllipsis) {
            this._renderer.addClass(this._elementRef.nativeElement.querySelector('table.rdk-table tbody'),
                'line-ellipsis');
        }
    }

    ngOnInit() {
        this._init();
        if (this.data instanceof TableData && this.data.header.length) {
            this._refresh();
        }
        this._hasInit = true;
    }

    ngAfterViewInit() {
        this._whileScrolling();
    }

    ngOnDestroy() {
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
        }
        this._removeWindowListener();
        this._removeAllTdListeners();

        this._scrollBar.whileScrolling.unsubscribe();
        this._rdkTableHeaders.forEach(rdkTableHeaders => {
            rdkTableHeaders.sortChange.unsubscribe();
        });

        this._removeTooltip();
    }

}

export class TableCellBasic implements AfterViewInit {
    protected _rdkTable: RdkTable;

    constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                protected changeDetector: ChangeDetectorRef,
                @Optional() rdkTable: RdkTable) {
        this._rdkTable = rdkTable;
    }

    @Input()
    public tableData: TableData;
    @Input()
    public cellData: any;
    @Input()
    public row: number;
    @Input()
    public column: number;
    @Input()
    public field: number;
    @Input()
    public renderer: Type<TableCellRenderer> | TemplateRef<any>;

    public rendererRef: ComponentRef<TableCellRenderer> | EmbeddedViewRef<any>;

    @ViewChild(RdkRendererHost) rendererHost: RdkRendererHost;

    /*
     * 渲染器制造工厂
     * */
    protected rendererFactory(renderer: Type<TableCellRenderer> | TemplateRef<any>): ComponentRef<TableCellRenderer> | EmbeddedViewRef<any> {
        if (renderer instanceof TemplateRef) {
            return this.rendererHost.viewContainerRef.createEmbeddedView(renderer, {
                context: {cellData: this.cellData, row: this.row, column: this.column}
            });
        } else {
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(renderer);
            let componentRef = this.rendererHost.viewContainerRef.createComponent(componentFactory);
            componentRef.instance.tableData = this.tableData;
            componentRef.instance.cellData = this.cellData;
            componentRef.instance.row = this.row;
            componentRef.instance.column = this.column;
            return componentRef;
        }
    }

    /*
     * 插入渲染器
     * */
    protected insertRenderer() {
        this.rendererRef = this.rendererFactory(this.renderer);
        this.changeDetector.detectChanges();
    }

    ngAfterViewInit(): void {
        this.insertRenderer();
    }
}

/*
 * 单元格
 * */
@Component({
    selector: '[rdk-table-cell]',
    template: '<ng-template rdk-renderer-host></ng-template>'
})
export class RdkTableCell extends TableCellBasic implements OnInit, OnDestroy {

    @Input()
    public editable: boolean = false;

    @Input()
    public editorRenderer: Type<TableCellRenderer>;

    @Input()
    public group: boolean;

    @Input()
    public rowSpan: number;

    public editorRendererRef: ComponentRef<TableCellRenderer> | EmbeddedViewRef<any>;

    private _goEditCallback: () => void;

    constructor(cfr: ComponentFactoryResolver,
                cd: ChangeDetectorRef,
                @Optional() rdkTable: RdkTable,
                private _renderer: Renderer2,
                private _elementRef: ElementRef) {
        super(cfr, cd, rdkTable);
    }

    private _emitDataChange(cellData: string | number): void {
        let oldCellData = this.cellData;
        this.cellData = cellData;

        //更新tableData
        let rows = [];
        for (let i = 0; i < this.rowSpan; i++) {
            this.tableData.data[this.row + i][this.field] = cellData;
            rows.push(this.row + i);
        }
        this._rdkTable.dataChange.emit({
            field: this.tableData.field[this.field],
            row: rows,
            column: this.column,
            rawColumn: this.field,
            cellData: this.cellData,
            oldCellData: oldCellData
        });
    }

    private _cacheRenderer(renderer: TableCellRenderer, editorRenderer: TableCellRenderer) {
        let rendererInfo = this._rdkTable.rendererList.find(renderer => renderer.row == this.row
        && renderer.column == this.column);
        if (rendererInfo) {
            rendererInfo.renderer = renderer;
            rendererInfo.editorRenderer = editorRenderer;
        } else {
            this._rdkTable.rendererList.push({
                row: this.row,
                column: this.column,
                rawColumn: this.field,
                renderer: renderer,
                editorRenderer: editorRenderer
            })
        }
    }

    private _rendererSubscribe(renderer: TableCellRenderer): void {
        renderer.cellDataChange.subscribe(cellData => {
            if (cellData === undefined || cellData === null) {
                //cellData === '' 认为是合法值
                return;
            }
            if (this.cellData != cellData) {
                this._emitDataChange(cellData);
            }
        });
    }

    private _editorRendererSubscribe(renderer: TableCellRenderer) {
        renderer.cellDataChange.subscribe(cellData => {
            if (cellData === undefined || cellData === null) {
                //cellData === '' 认为是合法值
                return;
            }
            if (this.cellData != cellData) {
                this._emitDataChange(cellData);
            }
            this.rendererHost.viewContainerRef.clear();
            this.insertRenderer();
            this._setGoEditListener();
            //重新对齐表头
            this._rdkTable._asyncSetFixedHeadWidth();
            //重新绑定td的tooltip
            this._rdkTable._rebindTooltipForCell(this._elementRef.nativeElement, this.cellData, this.row, this.column);
        });
    }

    /*
     * 插入渲染器
     * */
    protected insertRenderer() {
        super.insertRenderer();
        if (this.rendererRef instanceof ComponentRef) {
            this._rendererSubscribe(this.rendererRef.instance);
            this._cacheRenderer(this.rendererRef.instance, null);
        }
    }

    /*
     * 插入编辑渲染器
     * */
    protected insertEditorRenderer() {
        this.editorRendererRef = this.rendererFactory(this.editorRenderer);
        if (this.editorRendererRef instanceof ComponentRef) {
            this._editorRendererSubscribe(this.editorRendererRef.instance);
            this._cacheRenderer(null, this.editorRendererRef.instance);
        }

        if (this._goEditCallback) {
            this._goEditCallback();
        }

        this.changeDetector.detectChanges();
    }

    /*
     * 如果可编辑，单元格绑定点击事件
     * */
    private _setGoEditListener() {
        this._goEditCallback = this.editable ? this._renderer.listen(this._elementRef.nativeElement.parentElement, 'click', () => {
            this.rendererHost.viewContainerRef.clear();
            this.insertEditorRenderer();
            //重新对齐表头
            this._rdkTable._asyncSetFixedHeadWidth();
        }) : null;
    }

    ngOnInit() {
        //设置默认渲染器
        this.renderer = this.renderer ? this.renderer : DefaultCellRenderer;

        if (this.editable) {
            this._renderer.setStyle(this._elementRef.nativeElement.parentElement, 'cursor', 'pointer');
            //绑定点击事件
            this._setGoEditListener();
        }
    }

    ngOnDestroy() {
        if (this._goEditCallback) {
            this._goEditCallback();
        }

        if (this.rendererRef instanceof ComponentRef) {
            this.rendererRef.instance.cellDataChange.unsubscribe();
        }

        if (this.editorRendererRef instanceof ComponentRef) {
            this.editorRendererRef.instance.cellDataChange.unsubscribe();
        }
    }
}

/*
 * 表头单元格
 * */
@Component({
    selector: '[rdk-table-header]',
    template: `
        <div class="rdk-table-header-cell">
            <ng-template rdk-renderer-host></ng-template>
            <div *ngIf="sortable" [ngClass]="_sortOrderClass">
                <span (click)="_sortAsc()" class="rdk-table-sort-btn rdk-table-sort-up"></span>
                <span (click)="_sortDes()" class="rdk-table-sort-btn rdk-table-sort-down"></span>
            </div>
        </div>`,
    styleUrls: ['table-head.scss']
})
export class RdkTableHeader extends TableCellBasic implements OnInit, OnDestroy {
    private _sortOrderClass: Object;

    private _setSortOrderClass(sortOrder: SortOrder): void {
        this._sortOrderClass = {
            'rdk-table-sort-box': true,
            'rdk-table-asc': sortOrder == SortOrder.asc,
            'rdk-table-des': sortOrder == SortOrder.des
        }
    }

    @Input() public sortable: boolean;

    @Input() public sortAs: SortAs;

    @Input()
    public set defaultSortOrder(newValue) {
        if (newValue != null) {
            this._setSortOrderClass(newValue);
        }
    };

    @Output()
    public sortChange: EventEmitter<SortChangeEvent> = new EventEmitter<SortChangeEvent>();

    private _sortAsc(): void {
        this._sort(SortOrder.asc);
    }

    private _sortDes(): void {
        this._sort(SortOrder.des);
    }

    private _sort(order: SortOrder): void {
        this._setSortOrderClass(order);
        this.sortChange.emit({sortAs: this.sortAs, order: order, field: this.field});
    }

    private _emitDataChange(tableHeadChangeEvent: TableHeadChangeEvent): void {
        //更新tableData
        for (let row of tableHeadChangeEvent.rows) {
            this.tableData.data[row][this.field] = tableHeadChangeEvent.cellData;
        }

        this._rdkTable.dataChange.emit({
            field: this.tableData.field[this.field],
            row: tableHeadChangeEvent.rows,
            column: this.column,
            rawColumn: this.field,
            cellData: tableHeadChangeEvent.cellData,
            oldCellData: tableHeadChangeEvent.oldCellData
        });
    }

    /*
     * 插入渲染器
     * */
    protected insertRenderer() {
        super.insertRenderer();
        if (this.rendererRef instanceof ComponentRef) {
            this.rendererRef.instance.cellDataChange.subscribe(tableHeadChangeEvent => {
                this._emitDataChange(tableHeadChangeEvent);
            });
        }
    }

    ngOnInit() {
        //设置默认渲染器
        this.renderer = this.renderer ? this.renderer : DefaultCellRenderer;
    }

    ngOnDestroy() {
        if (this.rendererRef instanceof ComponentRef) {
            this.rendererRef.instance.cellDataChange.unsubscribe();
        }
    }
}

@NgModule({
    declarations: [
        RdkTable, RdkTableCell, RdkRendererHost, RdkTableHeader
    ],
    imports: [
        CommonModule, RdkScrollBarModule, RdkTooltipModule
    ],
    exports: [CommonModule, RdkTable, RdkTableCell, RdkRendererHost, RdkTableHeader],
    providers: [PopupService]
})
export class RdkTableModule {
}
