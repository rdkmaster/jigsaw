import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    Type,
    ViewChild,
    ViewChildren
} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AbstractJigsawComponent, JigsawRendererHost} from "../core";
import {TableData, TableDataHeader} from "../../core/data/table-data";
import {
    AdditionalColumnDefine,
    TableCellSetting,
    ColumnDefine,
    TableHeadSetting,
    RemoveTdListener,
    SortChangeEvent,
    TableCellRenderer,
    TableDataChangeEvent,
    TableHeadChangeEvent
} from "./table-api";

import {JigsawScrollBar, JigsawScrollBarModule} from "../../directive/scrollbar/scrollbar";
import {SortAs, SortOrder} from "../../core/data/component-data";
import {AffixUtils} from "../../core/utils/internal-utils";
import {TableCheckboxService} from "./table-service";
import {
    DefaultCellRenderer,
    JigsawTableRendererModule,
    TableCellCheckbox,
    TableCellEditor,
    TableCellNum,
    TableHeadCheckbox
} from "./table-renderer";
import {JigsawTooltipModule, SimpleTooltipComponent} from "../tooltip/tooltip";
import {CallbackRemoval, CommonUtils} from "../../core/utils/common-utils";
import {PopupEffect, PopupInfo, PopupPositionType, PopupService} from "../../service/popup.service";

@Component({
    selector: 'jigsaw-table',
    templateUrl: 'table.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[class.jigsaw-table-host]': 'true'
    },
    providers: [TableCheckboxService]
})
export class JigsawTable extends AbstractJigsawComponent implements AfterViewInit, OnDestroy, OnInit {
    private _data: TableData;
    private _removeRefreshCallback: CallbackRemoval;
    private _bakHeaderData: TableDataHeader = [];

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
            if (this.data.header.length != 0) {
                if (this._bakHeaderData.toString() === this.data.header.toString()) {
                    this._update('cell');
                } else {
                    this._update();
                }
            }
        });

        this._update();
    };

    private _update(scope: string = 'all') {
        if (!this.initialized) {
            return;
        }
        if (scope == 'all') {
            this._beforeUpdate();
            this._transformData();
            this._updateStyle();
        } else if (scope == 'cell') {
            this._transformCellSettings();
            this._updateStyle();
        }
    }

    @Output() public dataChange = new EventEmitter<TableDataChangeEvent>();

    private _select: number;
    @Input()
    get select(): number {
        return this._select;
    }

    set select(value: number) {
        this._select = value;
        if (this.initialized) {
            this._$handleRowClick(value);
        }
    }

    @Output()
    public selectChange: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    public doubleClick: EventEmitter<number> = new EventEmitter<number>();

    private _columnDefines: ColumnDefine[];

    @Input()
    public get columnDefines(): ColumnDefine[] {
        return this._columnDefines;
    }

    public set columnDefines(value: ColumnDefine[]) {
        if (this.columnDefines != value) {
            this._columnDefines = value;
            this._update();
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
            this._update();
        }
    }

    public static ROW_HEIGHT: number = 30;

    /**
     * @internal
     */
    public _$scrollBarOptions: any = {
        snapAmount: JigsawTable.ROW_HEIGHT,
        mouseWheel: {enable: true, scrollAmount: JigsawTable.ROW_HEIGHT * 3},
        // scrollInertia: 0,
    };

    @Input()
    public set scrollAmount(value: number) {
        if (typeof value == 'number' && value > 0) {
            this._$scrollBarOptions = {
                snapAmount: JigsawTable.ROW_HEIGHT,
                mouseWheel: {enable: true, scrollAmount: JigsawTable.ROW_HEIGHT * value},
            };
        }
    }

    public get scrollAmount(): number {
        return this._$scrollBarOptions.mouseWheel.scrollAmount;
    }

    @Input() public lineEllipsis;

    @Input() public hideHead: boolean;

    private _fixedHead: HTMLElement;

    /**
     * @internal
     */
    public _$headSettings: Array<TableHeadSetting> = [];

    /**
     * @internal
     */
    public _$cellSettings: Array<TableCellSetting>[] = [];

    private _removeTdListeners: Array<RemoveTdListener> = [];

    private _removeWindowResizeListener: Function;
    private _removeWindowScrollListener: Function;
    private _removeWindowLoadListener: Function;

    @ViewChild(JigsawScrollBar) private _scrollBar: JigsawScrollBar;

    @ViewChildren('header', {read: ElementRef})
    private _headers: QueryList<ElementRef>;

    @ViewChildren('fixedHeader', {read: ElementRef})
    private _fixedHeaders: QueryList<ElementRef>;

    @ViewChildren('tableRow', {read: ElementRef})
    private _rows: QueryList<ElementRef>;

    @ViewChildren(forwardRef(() => JigsawTableHeader))
    private _tableHeaders: QueryList<JigsawTableHeader>;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef, private _popupService: PopupService) {
        super()
    }

    public rendererList: any[] = [];

    public getRenderers(column) {
        return this.rendererList.filter(renderer => renderer.column == column);
    }

    private _beforeUpdate() {
        this._bakHeaderData = this.data.header;
        this._renderer.addClass(this._fixedHead, 'jigsaw-table-hide');
    }

    /*
     * 初始化_headSettings
     * */
    private _initHeadSettings(): void {
        this._$headSettings = [];
        this.data.header.forEach((cellData, index) => {
            this._$headSettings.push({
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
        this._$cellSettings = [];
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
            this._$cellSettings.push(cellSettings);
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
        this._$headSettings = this._$headSettings ? this._$headSettings.filter(headSetting => headSetting.visible) : null;
    }

    /*
     * 过滤掉不显示的列
     * */
    private _filterCellSettings(): void {
        if (this._$cellSettings) {
            this._$cellSettings.forEach((cellSettings, index) => {
                this._$cellSettings[index] = cellSettings.filter(cellSetting => cellSetting.visible);
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
        for (let i = 0; i < this._$cellSettings.length - rowIndex - 1; i++) {
            if (this._$cellSettings[rowIndex + i + 1][colIndex].cellData == cellSetting.cellData) {
                rowSpan += 1;
                if (i == this._$cellSettings.length - rowIndex - 2) {
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
        this._$cellSettings.forEach((cellSettings, rowIndex) => {
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
    private _dataDefaultSort(): boolean {
        if (this._$headSettings) {
            //默认按第一个排序
            let headSetting = this._$headSettings.find(headSetting => headSetting.sortable &&
                (headSetting.defaultSortOrder == SortOrder.asc || headSetting.defaultSortOrder == SortOrder.des)
            );
            if (headSetting) {
                this.data.sort(headSetting.sortAs, headSetting.defaultSortOrder, headSetting.field);
                return true;
            }
        }
        return false
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
        const defaultSorted = this._dataDefaultSort();
        if (!defaultSorted) {
            this._transformCellSettings();
        }
    }

    /*
     * 根据column修改表头列数据
     * */
    private _mergeHeadSetting(index, column: ColumnDefine): void {
        if (index >= 0 && index < this.data.header.length) {
            this._generateHeadSetting(this._$headSettings[index], column);
        }
    }

    /*
     * 根据column修改单元格列数据
     * */
    private _mergeCellSetting(index, column: ColumnDefine): void {
        if (index >= 0 && index < this.data.header.length) {
            this._$cellSettings.forEach(cellSettings => {
                this._generateCellSetting(cellSettings[index], column);
            });
        }
    }

    /*
     * 根据元素在field的index找到在headSettings中的index
     * */
    private _getIndexInHeadSettings(pos): number {
        let index = null;
        for (let i = 0; i < this._$headSettings.length; i++) {
            if (this._$headSettings[i].field == pos) {
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
        for (let i = 0; i < this._$cellSettings[0].length; i++) {
            if (this._$cellSettings[0][i].field == pos) {
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
        let headSetting: TableHeadSetting = {
            cellData: this._$headSettings[index].cellData,
            width: null,
            visible: true,
            renderer: null,
            class: '',
            sortable: false,
            sortAs: SortAs.string,
            defaultSortOrder: SortOrder.default,
            field: this._$headSettings[index].field
        };
        this._insertHeadSetting(pos, additionalColumn, headSetting);
    }

    /*
     * 移动列位置
     * */
    private _insertCloneCellSettings(pos: number, target: string | number, additionalColumn: AdditionalColumnDefine) {
        let index = this._getIndexInCellSettings(this._getPosInField(target));

        //插入列
        this._$cellSettings.forEach(cellSettings => {
            let cellSetting: TableCellSetting = {
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
    private _insertHeadSetting(pos, additionalColumn: AdditionalColumnDefine, headSetting?: TableHeadSetting): void
    private _insertHeadSetting(pos, additionalColumn: AdditionalColumnDefine, headSetting?: TableHeadSetting): void {
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
            const index = this._$headSettings.indexOf(this._$headSettings.find(headSetting => headSetting.field == pos));
            this._$headSettings.splice(index, 0, headSetting);
        } else {
            this._$headSettings.push(headSetting)
        }
    }

    /*
     * 插入单元格列
     * */
    private _insertCellSetting(pos, additionalColumn: AdditionalColumnDefine): void
    private _insertCellSetting(pos, additionalColumn: AdditionalColumnDefine, cellSetting?: TableCellSetting, cellSettings?: TableCellSetting[]): void
    private _insertCellSetting(pos, additionalColumn: AdditionalColumnDefine, cellSetting?: TableCellSetting, cellSettings?: TableCellSetting[]): void {
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
                this._$cellSettings.forEach((cellSettings) => {
                    const index = cellSettings.indexOf(cellSettings.find(cellSetting => cellSetting.field == pos));
                    cellSettings.splice(index, 0, cellSetting);
                })
            } else {
                this._$cellSettings.forEach((cellSettings) => {
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
    private _generateHeadSetting(headSetting: TableHeadSetting,
                                 column: ColumnDefine | AdditionalColumnDefine): TableHeadSetting {
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
    private _generateCellSetting(cellSetting: TableCellSetting,
                                 column: ColumnDefine | AdditionalColumnDefine): TableCellSetting {
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

        //消除table非必要的横向滚动条(可能会有的小数点像素的四舍五入产生的滚动条)，这里手动让.jigsaw-table和.jigsaw-table-box宽度相同
        this._renderer.setStyle(this._elementRef.nativeElement.querySelector('.jigsaw-table'), 'width', hostWidth);
        this._renderer.setStyle(this._elementRef.nativeElement.querySelector('.jigsaw-table-box'), 'width', hostWidth);

        //获取表格的实际宽度
        const tableWidth = this._elementRef.nativeElement.querySelector('.jigsaw-table').offsetWidth + 'px';

        //设置浮动表头的宽度
        this._renderer.setStyle(this._elementRef.nativeElement.querySelector('.jigsaw-table-fixed-head'), 'width', tableWidth);

        //设置浮动表头单元格宽度
        this._fixedHeaders.forEach((fixedHeader, index) => {
            this._renderer.setStyle(fixedHeader.nativeElement, 'width',
                this._headers.toArray()[index].nativeElement.offsetWidth + 'px');
        });

        this._renderer.removeClass(this._fixedHead, 'jigsaw-table-hide');
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
            const elements: NodeListOf<Element> = row.nativeElement.querySelectorAll('.jigsaw-table-cell-content');
            for (let colIndex = 0; colIndex < elements.length; ++colIndex) {
                const element: Element = elements[colIndex];
                const cellSetting: TableCellSetting = this._$cellSettings[rowIndex][colIndex];
                //没有渲染器或者用DefaultCellRenderer的单元格才能用省略
                if (!cellSetting.renderer || cellSetting.renderer == DefaultCellRenderer) {
                    let width = CommonUtils.getCssValue(cellSetting.width);
                    if (width.match(/^\s*\d+%\s*$/)) {
                        width = hostWidth * Number(width.replace(/%/, '')) / 100 + 'px';
                        this._renderer.setStyle(element, 'width', width);
                    } else {
                        this._renderer.setStyle(element, 'width', width);
                    }

                    const cellText: HTMLElement = <HTMLElement>element.querySelector('span.jigsaw-table-cell-text');
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

    private _removeTooltip() {
        if (this._tooltipInfo) {
            this._tooltipInfo.dispose();
            this._tooltipInfo = null;
        }
    }

    public _rebindTooltipForCell(element: HTMLElement, message: any, rowIndex: number, colIndex: number) {
        //删除对应td的tooltip的事件
        this._removeTdListenersByIndex(rowIndex, colIndex);
        //重新绑定td的tooltip
        const cellText: HTMLElement = <HTMLElement>element.querySelector('span.jigsaw-table-cell-text');
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

    public _$handleRowClick(rowIndex: number) {
        this._rows.forEach((row, index) => {
            if (index === rowIndex) {
                this._renderer.addClass(row.nativeElement, 'jigsaw-table-row-selected');
                this.selectChange.emit(rowIndex);
            } else {
                this._renderer.removeClass(row.nativeElement, 'jigsaw-table-row-selected');
            }
        })
    }

    public _$handleRowDoubleClick(rowIndex: number) {
        this.doubleClick.emit(rowIndex);
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

    private _asyncSelectRow() {
        setTimeout(() => {
            this._$handleRowClick(this._select);
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
            this._tableHeaders.length && this._tableHeaders.forEach(tableHeaders => {
                tableHeaders.sortChange.subscribe(value => {
                    this.data.sort(value.sortAs, value.order, value.field);
                })
            })
        }, 0);
    }

    private _updateStyle() {
        this._asyncSetCellLineEllipsis();
        this._asyncSetFixedHeadWidth();
        this._asyncSelectRow();
        this._addWindowListener();
        this._subscribeSortChange();
    }

    private _init() {
        this._renderer.setStyle(this._elementRef.nativeElement.querySelector('.jigsaw-table-box'),
            'max-height', this._maxHeight);
        this._fixedHead = this._elementRef.nativeElement.querySelector(".jigsaw-table-fixed-head");

        if (this.lineEllipsis) {
            this._renderer.addClass(this._elementRef.nativeElement.querySelector('table.jigsaw-table tbody'),
                'jigsaw-table-line-ellipsis');
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this._init();
        if (this.data instanceof TableData && this.data.header.length) {
            this._update();
        }
    }

    ngAfterViewInit() {
        this._whileScrolling();
        this._$handleRowClick(this._select);
    }

    ngOnDestroy() {
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
        }
        this._removeWindowListener();
        this._removeAllTdListeners();

        this._scrollBar.whileScrolling.unsubscribe();
        this._tableHeaders.forEach(tableHeaders => {
            tableHeaders.sortChange.unsubscribe();
        });

        this._removeTooltip();
    }

}

export class TableCellBasic implements AfterViewInit {
    protected _jigsawTable: JigsawTable;

    constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                protected changeDetector: ChangeDetectorRef,
                @Optional() jigsawTable: JigsawTable) {
        this._jigsawTable = jigsawTable;
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

    @ViewChild(JigsawRendererHost) rendererHost: JigsawRendererHost;

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
    selector: '[jigsaw-table-cell]',
    template: '<ng-template jigsaw-renderer-host></ng-template>'
})
export class JigsawTableCell extends TableCellBasic implements OnInit, OnDestroy {

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
                @Optional() jigsawTable: JigsawTable,
                private _renderer: Renderer2,
                private _elementRef: ElementRef) {
        super(cfr, cd, jigsawTable);
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
        this._jigsawTable.dataChange.emit({
            field: this.tableData.field[this.field],
            row: rows,
            column: this.column,
            rawColumn: this.field,
            cellData: this.cellData,
            oldCellData: oldCellData
        });
    }

    private _cacheRenderer(renderer: TableCellRenderer, editorRenderer: TableCellRenderer) {
        let rendererInfo = this._jigsawTable.rendererList.find(renderer => renderer.row == this.row
            && renderer.column == this.column);
        if (rendererInfo) {
            rendererInfo.renderer = renderer;
            rendererInfo.editorRenderer = editorRenderer;
        } else {
            this._jigsawTable.rendererList.push({
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
            this._jigsawTable._asyncSetFixedHeadWidth();
            //重新绑定td的tooltip
            this._jigsawTable._rebindTooltipForCell(this._elementRef.nativeElement, this.cellData, this.row, this.column);
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
            this._jigsawTable._asyncSetFixedHeadWidth();
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
    selector: '[jigsaw-table-header]',
    template: `
        <div class="jigsaw-table-header-cell">
            <ng-template jigsaw-renderer-host></ng-template>
            <div *ngIf="sortable" [ngClass]="_$sortOrderClass">
                <span (click)="_sortAsc()" class="jigsaw-table-sort-btn jigsaw-table-sort-up"></span>
                <span (click)="_sortDes()" class="jigsaw-table-sort-btn jigsaw-table-sort-down"></span>
            </div>
        </div>`,
})
export class JigsawTableHeader extends TableCellBasic implements OnInit, OnDestroy {
    /**
     * @internal
     */
    public _$sortOrderClass: Object;

    private _setSortOrderClass(sortOrder: SortOrder): void {
        this._$sortOrderClass = {
            'jigsaw-table-sort-box': true,
            'jigsaw-table-asc': sortOrder == SortOrder.asc,
            'jigsaw-table-des': sortOrder == SortOrder.des
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

        this._jigsawTable.dataChange.emit({
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
        JigsawTable, JigsawTableCell, JigsawRendererHost, JigsawTableHeader
    ],
    imports: [
        CommonModule, JigsawScrollBarModule, JigsawTooltipModule, JigsawTableRendererModule,
    ],
    exports: [CommonModule, JigsawTable, JigsawTableCell, JigsawRendererHost, JigsawTableHeader],
    providers: [PopupService],
    entryComponents: [
        DefaultCellRenderer,
        TableHeadCheckbox,
        TableCellCheckbox,
        TableCellNum,
        TableCellEditor
    ]
})
export class JigsawTableModule {
}

export * from './table-api';
export * from './table-renderer';
