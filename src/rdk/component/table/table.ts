import {
    Component, Input, NgModule, ComponentFactoryResolver, AfterViewInit, ViewChild, Type, ChangeDetectorRef, ElementRef,
    Renderer2, OnInit, ComponentRef, Output, EventEmitter, ViewChildren, QueryList, forwardRef, OnDestroy, Optional
} from "@angular/core";
import {CommonModule} from "@angular/common";

import {RdkRendererHost, AbstractRDKComponent} from "../core";
import {TableData} from "../../core/data/table-data";
import {TableCellRenderer, ColumnSetting, AdditionalColumnSetting, TableMsg} from "./table-api";

import {RdkScrollBarModule} from "../scrollbar/scrollbar";
import {RdkScrollBar} from "../scrollbar/scrollbar";
import {SortAs, SortOrder, CallbackRemoval} from "../../core/data/component-data";
import {CommonUtils} from "../../core/utils/common-utils";
import {TableCellDefault} from "./table-renderer";
import {AffixUtils} from "../../core/utils/internal-utils";

class HeadSetting {
    cellData: string | number;
    width: string | number;
    visible: boolean;
    renderer: Type<TableCellRenderer>;
    class: string;
    sortable: boolean;
    sortAs: SortAs;
    defaultSortOrder: SortOrder;
    field: number;
}

class CellSetting {
    cellData: string | number;
    visible: boolean;
    renderer: Type<TableCellRenderer>;
    class: string;
    editable: boolean;
    editorRenderer: Type<TableCellRenderer>;
    group: boolean;
    field: number;
    rowSpan: number;
}

export class TableCellBasic implements AfterViewInit {
    constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                protected changeDetector: ChangeDetectorRef) {
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
    protected renderer: Type<TableCellRenderer>;

    public rendererRef: ComponentRef<TableCellRenderer>;

    @ViewChild(RdkRendererHost) rendererHost: RdkRendererHost;

    /*
     * 渲染器制造工厂
     * */
    protected rendererFactory(renderer: Type<TableCellRenderer>): ComponentRef<TableCellRenderer> {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(renderer);
        let componentRef = this.rendererHost.viewContainerRef.createComponent(componentFactory);
        componentRef.instance.tableData = this.tableData;
        componentRef.instance.cellData = this.cellData;
        componentRef.instance.row = this.row;
        componentRef.instance.column = this.column;
        return componentRef;
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

@Component({
    selector: 'rdk-table',
    templateUrl: 'table.html',
    styleUrls: ['table.scss'],
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height'
    }
})
export class RdkTable extends AbstractRDKComponent implements AfterViewInit, OnDestroy, OnInit {
    private _data: TableData;
    private _columns: ColumnSetting[];
    private _additionalColumns: AdditionalColumnSetting[];
    private _removeRefreshCallback: CallbackRemoval;
    private _hasInit: boolean; //组件是否已初始化
    private _scrollBarOptions: Object;
    private _isNormalRefresh : boolean = true; //data的排序onRefresh()
    private _maxHeight: string;

    @Input()
    public get maxHeight(): string {
        return this._maxHeight;
    }

    public set maxHeight(value: string) {
        value = typeof value === 'string' ? value : value + '';
        const match = value ? value.match(/^\s*\d+%|px\s*$/) : null;
        this._maxHeight =  match ? value : value + 'px';
        this._renderer.setStyle(this._elementRef.nativeElement.querySelector('.rdk-table-box'), 'max-height', this._maxHeight);
    }

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
            if(this._isNormalRefresh){
                this._refresh();
            }else{
                this.transformCellSettings();
                this._isNormalRefresh = true;
            }
        });

        if (this._hasInit) {
            this._refresh();
        }
    };

    @Output() public dataChange: EventEmitter<TableMsg> = new EventEmitter<TableMsg>();

    @Input()
    get columns(): ColumnSetting[] {
        return this._columns;
    }

    set columns(value: ColumnSetting[]) {
        if (this.columns != value) {
            this._columns = value;
            if (this._hasInit) {
                this._refresh();
            }
        }
    }

    @Input()
    get additionalColumns(): AdditionalColumnSetting[] {
        return this._additionalColumns;
    }

    set additionalColumns(value: AdditionalColumnSetting[]) {
        if (this.additionalColumns != value) {
            this._additionalColumns = value;
            if (this._hasInit) {
                this._refresh();
            }
        }
    }

    @Input()
    public set scrollAmount(value) {
        if (typeof value == 'number' && value > 0) {
            this._scrollBarOptions = {
                snapAmount: 30,
                mouseWheel: {enable: true, scrollAmount: 30 * value}
            };
        }
    }

    private _fixedHead: HTMLElement;

    private _headSettings: Array<HeadSetting> = [];

    private _cellSettings: Array<CellSetting>[] = [];

    private _windowResizeListen: Function;

    private _windowLoadListen: Function;

    @ViewChild(RdkScrollBar) private _scrollBar: RdkScrollBar;

    @ViewChildren('header', {read: ElementRef}) headers: QueryList<ElementRef>;

    @ViewChildren('fixedHeader', {read: ElementRef}) fixedHeaders: QueryList<ElementRef>;

    @ViewChildren(forwardRef(() => RdkTableHeader)) rdkTableHeaders: QueryList<RdkTableHeader>;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
        super()
    }

    /*
     * 重新渲染
     * */
    private _refresh() {
        this._transformData();
        this.asynAlignHead();//表头对齐
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
        if(!this._columns) return;
        this._columns.forEach(column => {
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
        if(!this._additionalColumns) return;
        this._additionalColumns.forEach(additionalColumn => {
            let pos = additionalColumn.pos;
            const target = additionalColumn.target;
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
        if(this._cellSettings){
            this._cellSettings.forEach((cellSettings, index) => {
                this._cellSettings[index] = cellSettings.filter(cellSetting => cellSetting.visible);
            });
        }
    }

    /*
    * cellSetting设置rowSpan
    * */
    private _setRowSpan(rowSpans, rowSpan, colIndex, cellSetting){
        if(rowSpans[colIndex] === undefined){
            rowSpans.push(rowSpan);
        }else{
            rowSpans[colIndex] = rowSpan;
        }
        cellSetting.rowSpan = rowSpan;
    }

    /*
    * 列检查合并单元格
    * */
    private _checkRowSpan(rowSpans, rowSpan, rowIndex, colIndex, cellSetting){
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
                    if (!cellSetting.group) {
                        rowSpans.push(1);
                        cellSetting.rowSpan = 1;
                    } else {
                        this._checkRowSpan(rowSpans, rowSpan, rowIndex, colIndex, cellSetting);
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
        if (this._columns) {
            //默认按第一个排序
            let column = this._columns.find(column =>
                column.header
                && (typeof column.target === 'string' || typeof column.target === 'number')
                && column.header.sortable
                && (column.header.defaultSortOrder == SortOrder.asc || column.header.defaultSortOrder == SortOrder.des)
            );
            if(column){
                this.data.sort(column.header.sortAs, column.header.defaultSortOrder, <string|number>column.target);
            }
        }
    }

    /*
    * 转换headSettings,渲染head
    * */
    private transformHeadSettings(){
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
    private transformCellSettings(){
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
        this._dataDefaultSort();
        this.transformHeadSettings();
        this.transformCellSettings();
    }

    /*
     * 根据column修改表头列数据
     * */
    private _mergeHeadSetting(index, column: ColumnSetting): void {
        if (index >= 0 && index < this.data.header.length) {
            this._generateHeadSetting(this._headSettings[index], column);
        }
    }

    /*
     * 根据column修改单元格列数据
     * */
    private _mergeCellSetting(index, column: ColumnSetting): void {
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
    private _getPosInField(target: string|number): number{
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
    private _insertCloneHeadSettings(pos: number, target: string | number, additionalColumn: AdditionalColumnSetting) {
        let index = this._getIndexInHeadSettings(this._getPosInField(target));

        //插入列头
        let headSetting = <HeadSetting>CommonUtils.shallowCopy(this._headSettings[index]);
        headSetting.visible = true;
        headSetting.field = -1;
        this._insertHeadSetting(pos, additionalColumn, headSetting);
    }

    /*
     * 移动列位置
     * */
    private _insertCloneCellSettings(pos: number, target: string | number, additionalColumn: AdditionalColumnSetting) {
        let index = this._getIndexInCellSettings(this._getPosInField(target));

        //插入列
        this._cellSettings.forEach(cellSettings => {
            let cellSetting = <CellSetting>CommonUtils.shallowCopy(cellSettings[index]);
            cellSetting.visible = true;
            cellSetting.field = -1;
            this._insertCellSetting(pos, additionalColumn, cellSetting, cellSettings);
        })
    }

    /*
     * 插入表头列
     * */
    private _insertHeadSetting(pos, additionalColumn: AdditionalColumnSetting): void
    private _insertHeadSetting(pos, additionalColumn: AdditionalColumnSetting, headSetting?: HeadSetting): void
    private _insertHeadSetting(pos, additionalColumn: AdditionalColumnSetting, headSetting?: HeadSetting): void {
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
    private _insertCellSetting(pos, additionalColumn: AdditionalColumnSetting): void
    private _insertCellSetting(pos, additionalColumn: AdditionalColumnSetting, cellSetting?: CellSetting, cellSettings?: CellSetting[]): void
    private _insertCellSetting(pos, additionalColumn: AdditionalColumnSetting, cellSetting?: CellSetting, cellSettings?: CellSetting[]): void {
        cellSetting = cellSetting ? cellSetting : {
                cellData: '',
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
                    /*let cellSettingClone: CellSetting = <CellSetting>this._clone(cellSetting);
                     const index = cellSettings.indexOf(cellSettings.find(cellSetting => cellSetting.pos == pos));
                     cellSettings.splice(index, 0, cellSettingClone);*/
                    const index = cellSettings.indexOf(cellSettings.find(cellSetting => cellSetting.field == pos));
                    cellSettings.splice(index, 0, cellSetting);
                })
            } else {
                this._cellSettings.forEach((cellSettings) => {
                    /*let cellSettingClone: CellSetting = <CellSetting>this._clone(cellSetting);
                     cellSettings.push(cellSettingClone);*/
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
                                 column: ColumnSetting | AdditionalColumnSetting): HeadSetting {
        headSetting.width = column.width ? column.width : headSetting.width;
        headSetting.visible = column.visible === true || column.visible === false ? column.visible : headSetting.visible;

        const header = column.header;
        if (header) {
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
                                 column: ColumnSetting | AdditionalColumnSetting): CellSetting {
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
                cellSetting.renderer = TableCellDefault;
            }
        }
        return cellSetting;
    }

    private _setFixedHeadWidth(): void {
        const tableWidth = this._elementRef.nativeElement.querySelector('.rdk-table').offsetWidth + 'px';
        this._renderer.setStyle(this._elementRef.nativeElement.querySelector('.rdk-table-fixed-head'), 'width', tableWidth);
        this._renderer.setStyle(
            this._elementRef.nativeElement.querySelector('.rdk-table-box .mCSB_container:first-child'), 'width', tableWidth);
        this.fixedHeaders.forEach((fixedHeader, index) => {
            this._renderer.setStyle(fixedHeader.nativeElement, 'width',
                this.headers.toArray()[index].nativeElement.offsetWidth + 'px');
        })
    }

    private _setScrollBar(): void {
        this._fixedHead = this._elementRef.nativeElement.querySelector(".rdk-table-fixed-head");
        this._scrollBar.whileScrolling.subscribe(scrollEvent => {
            if (scrollEvent.direction == 'x') {
                this._renderer.setStyle(this._fixedHead, 'left', scrollEvent.left + 'px');
            }
        });
    }

    private _floatHead(maxTop) {
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

    /*
     * 表头对齐
     * */
    public asynAlignHead() {
        setTimeout(() => {
            this._setFixedHeadWidth();
        }, 0);

        setTimeout(() => {
            this._setFixedHeadWidth();
        }, 1000);
    }

    ngOnInit() {
        if (this.data instanceof TableData && this.data.header.length) {
            this._transformData();
            this._hasInit = true;
        }
    }

    ngAfterViewInit() {
        this._setScrollBar();

        this.asynAlignHead();

        this._windowLoadListen = this._renderer.listen('window', 'load', () => {
            this._setFixedHeadWidth();
        });
        this._windowResizeListen = this._renderer.listen('window', 'resize', () => {
            this._setFixedHeadWidth();
            this._floatHead(maxTop);
        });

        const maxTop = this._elementRef.nativeElement.offsetHeight - this._fixedHead.offsetHeight;
        this._windowResizeListen = this._renderer.listen('window', 'scroll', () => {
            this._floatHead(maxTop);
        });

        setTimeout(()=>{
            this.rdkTableHeaders.length && this.rdkTableHeaders.forEach(rdkTableHeaders => {
                rdkTableHeaders.sortChange.subscribe(() => {
                    this._isNormalRefresh = false;
                })
            })
        }, 0);
    }

    ngOnDestroy() {
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
        }
        if (this._windowLoadListen) {
            this._windowLoadListen();
        }
        if (this._windowResizeListen) {
            this._windowResizeListen();
        }
    }

}

/*
 * 单元格
 * */
@Component({
    selector: '[rdk-table-cell]',
    template: '<ng-template rdk-renderer-host></ng-template>'
})
export class RdkTableCell extends TableCellBasic implements OnInit {

    @Input()
    public editable: boolean = false;

    @Input()
    public editorRenderer: Type<TableCellRenderer>;

    @Input()
    public group: boolean;

    @Input()
    public rowSpan: number;

    public editorRendererRef: ComponentRef<TableCellRenderer>;

    private goEditCallback: () => void;

    private _rdkTable: RdkTable;

    constructor(cfr: ComponentFactoryResolver,
                cd: ChangeDetectorRef,
                private _rdr: Renderer2,
                private _el: ElementRef,
                @Optional() rdkTable: RdkTable) {
        super(cfr, cd);
        this._rdkTable = rdkTable;
    }

    /*
     * 插入编辑渲染器
     * */
    protected insertEditorRenderer() {
        this.editorRendererRef = this.rendererFactory(this.editorRenderer);

        this.editorRendererRef.instance.changeToText.subscribe(cellData => {
            if (cellData) {
                if (this.cellData != cellData) {
                    let oldCellData = this.cellData;
                    this.cellData = cellData;

                    //更新tableData
                    let rows = [];
                    for(let i = 0; i < this.rowSpan; i++){
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
                this.rendererHost.viewContainerRef.clear();
                this.insertRenderer();
                this._onClick();
                this._rdkTable.asynAlignHead();
            }
        });

        if(this.goEditCallback){
            this.goEditCallback();
        }

        this.changeDetector.detectChanges();
    }

    /*
     * 如果可编辑，单元格绑定点击事件
     * */
    private _onClick() {
        this.goEditCallback = this.editable ? this._rdr.listen(this._el.nativeElement, 'click', () => {
                this.rendererHost.viewContainerRef.clear();
                this.insertEditorRenderer();
                this._rdkTable.asynAlignHead();
            }) : null;
    }

    ngOnInit() {
        //设置默认渲染器
        this.renderer = this.renderer ? this.renderer : DefaultCellRenderer;

        //绑定点击事件
        this._onClick();

        if(this.editable){
            this._rdr.setStyle(this._el.nativeElement, 'cursor', 'pointer');
        }
    }

}

/*
 * 表头单元格
 * */
@Component({
    selector: '[rdk-table-header]',
    template: `
        <ng-template rdk-renderer-host></ng-template>
        <div *ngIf="sortable" [ngClass]="_sortOrderClass">
            <span (click)="_sortAsc()" class="rdk-table-sort-btn rdk-table-sort-up"></span>
            <span (click)="_sortDes()" class="rdk-table-sort-btn rdk-table-sort-down"></span>
        </div>`,
    styleUrls: ['table-head.scss']
})
export class RdkTableHeader extends TableCellBasic implements OnInit {
    private _rdkTable: RdkTable;
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
    public sortChange: EventEmitter<any> = new EventEmitter<any>();

    constructor(cfr: ComponentFactoryResolver, cd: ChangeDetectorRef, @Optional() rdkTable: RdkTable) {
        super(cfr, cd);
        this._rdkTable = rdkTable;
    }

    private _sortAsc(): void {
        this._sort(SortOrder.asc);
    }

    private _sortDes(): void {
        this._sort(SortOrder.des);
    }

    private _sort(order: SortOrder): void {
        this._setSortOrderClass(order);
        this.tableData.sort(this.sortAs, order, this.field);
        this.sortChange.emit();
        this.tableData.refresh();
    }

    ngOnInit() {
        //设置默认渲染器
        this.renderer = this.renderer ? this.renderer : DefaultCellRenderer;
    }
}

/*
 * 默认表格渲染组件
 * */
@Component({
    template: '<span>{{cellData}}</span>'
})
export class DefaultCellRenderer extends TableCellRenderer {
}

@NgModule({
    declarations: [
        RdkTable, RdkTableCell, RdkRendererHost, RdkTableHeader
    ],
    imports: [
        CommonModule, RdkScrollBarModule
    ],
    exports: [CommonModule, RdkTable, RdkTableCell, RdkRendererHost, RdkTableHeader]
})
export class RdkTableModule {
}
