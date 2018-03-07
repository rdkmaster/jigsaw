import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent, JigsawCommonModule} from "../common";
import {JigsawTableCellInternalComponent, JigsawTableHeaderInternalComponent} from "./table-inner.components";
import {TableData} from "../../core/data/table-data";

import {
    _getColumnIndex,
    AdditionalColumnDefine,
    AdditionalTableData,
    ColumnDefine,
    ColumnDefineGenerator,
    SortChangeEvent,
    TableCellSetting,
    TableDataChangeEvent,
    TableHeadSetting
} from "./table-typings";
import {CallbackRemoval, CommonUtils} from "../../core/utils/common-utils";
import {SortOrder} from "../../core/data/component-data";
import {DefaultCellRenderer, JigsawTableRendererModule, TableCellTextEditorRenderer} from "./table-renderer";
import {AffixUtils} from "../../core/utils/internal-utils";
import {
    PerfectScrollbarDirective,
    PerfectScrollbarModule
} from "ngx-perfect-scrollbar";
import {TableUtils} from "./table-utils";

@Component({
    selector: 'jigsaw-table, j-table',
    templateUrl: 'table.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[class.jigsaw-table-host]': 'true'
    },
})
export class JigsawTable extends AbstractJigsawComponent implements OnInit, AfterViewInit, OnDestroy {

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef, private _zone: NgZone) {
        super();
    }

    @Input()
    public get width(): string {
        return this._width;
    }

    public set width(value: string) {
        this._width = CommonUtils.getCssValue(value);
        setTimeout(() => {
            this.resize();
        });
    }

    @Output()
    public sort = new EventEmitter<SortChangeEvent>();

    private _contentWidth: string = 'auto';

    @Input()
    public get contentWidth(): string {
        return this._contentWidth;
    }

    public set contentWidth(value: string) {
        this._contentWidth = CommonUtils.getCssValue(value);
    }

    @Input()
    public hideHeader: boolean = false;

    private _selectedRow: number;

    @Input()
    public get selectedRow(): number {
        return this._selectedRow;
    }

    public set selectedRow(value: number) {
        this._selectedRow = value;
        if (this.initialized) {
            this._$selectRow(value);
        }
    }

    @Output()
    public selectChange: EventEmitter<number> = new EventEmitter<number>();

    private _getColumnIndex(field: string): [number, TableData] {
        return _getColumnIndex(this.data, this._additionalData, field);
    }

    private _getHeaderValueByField(field): string {
        let [index, tableData] = this._getColumnIndex(field);
        if (index == -1) {
            console.error('no header value found, unknown field: ' + field);
            return '';
        }
        return tableData.header[index];
    }

    /**
     * @internal
     */
    public _$headerSettings: TableHeadSetting[] = [];
    private _headerSettingsBackup: { [field: string]: TableHeadSetting } = {};

    private _updateHeaderSettings(columnDefines: ColumnDefine[]): void {
        const oldBackup = CommonUtils.shallowCopy(this._headerSettingsBackup);
        this._headerSettingsBackup = {};
        this._$headerSettings.splice(0, this._$headerSettings.length);

        columnDefines.forEach(columnDefine => {
            if (columnDefine.visible === false) {
                return;
            }

            const field: string = <string>columnDefine.target;
            let settings = oldBackup[field];
            settings = TableUtils.updateHeaderSettings(columnDefine, settings);
            if (settings.cellData === null) {
                settings.cellData = this._getHeaderValueByField(field);
            }
            this._$headerSettings.push(settings);
            this._headerSettingsBackup[field] = settings;
        });
    }

    /**
     * 没有cellData generator获取数据的情况
     * @param {string} field
     * @param {number} row
     * @returns {any}
     * @private
     */
    private _getCellDataByField(field: string, row: number): any {
        let [index, tableData] = this._getColumnIndex(field);
        if (index == -1) {
            console.error('no cell data found, unknown field: ' + field);
            return '';
        }
        if (!tableData.data[row]) {
            tableData.data[row] = [];
        }
        if (tableData instanceof AdditionalTableData) {
            // 没有cellData generator获取数据的情况
            // 如果是AdditionalTableData，重新reset AdditionalTableData，cellData取空值，
            // 在renderer里面通过touchedValue取真实的值，见issue522
            tableData.data[row][index] = '';
        }
        return tableData.data[row][index];
    }

    private _setCellDataByField(field: string, row: number, data: any): void {
        let [index, tableData] = this._getColumnIndex(field);
        if (index == -1) {
            console.error('no cell data found, unable to set, field: ' + field);
            return;
        }
        if (!tableData.data[row]) {
            tableData.data[row] = [];
        }
        tableData.data[row][index] = data;
    }

    /**
     * @internal
     */
    public _$cellSettings: TableCellSetting[][] = [];
    private _cellSettingsBackup: { [field: string]: TableCellSetting[] } = {};

    private _updateCellSettings(columnDefines: ColumnDefine[]): void {
        // clear origin settings, but keep the origin row array ref,
        // which will avoid ngFor from re-rendering the dom
        this._$cellSettings.forEach(row => row.splice(0, row.length));
        const dataLen = this.data.data.length;
        // remove extra lines if necessary
        this._$cellSettings.splice(dataLen, this._$cellSettings.length);
        this._additionalData.data.splice(dataLen, this._$cellSettings.length);

        let oldBackup = CommonUtils.shallowCopy(this._cellSettingsBackup);
        this._cellSettingsBackup = {};

        columnDefines.forEach(columnDefine => {
            if (columnDefine.visible === false) {
                return;
            }

            const field = <string>columnDefine.target;
            // prepare for backing up the new settings
            this._cellSettingsBackup[field] = [];

            const [realColIndex,] = this._getColumnIndex(field);
            let groupSetting: TableCellSetting;
            let settings: TableCellSetting;
            for (let rowIndex = 0; rowIndex < dataLen; rowIndex++) {
                settings = oldBackup[field] ? oldBackup[field][rowIndex] : undefined;
                settings = TableUtils.updateCellSettings(columnDefine, settings);
                // reset the rowSpan value, it will be recomputed later.
                settings.rowSpan = 1;
                this._cellSettingsBackup[field].push(settings);

                if (!this._$cellSettings[rowIndex]) {
                    this._$cellSettings.push([]);
                }
                this._$cellSettings[rowIndex].push(settings);

                if (settings.editable) {
                    settings.renderer = settings.renderer ? settings.renderer : DefaultCellRenderer;
                    settings.editorRenderer = settings.editorRenderer ? settings.editorRenderer : TableCellTextEditorRenderer;
                }

                const cellDataGenerator = TableUtils.getGenerator(columnDefine, 'data');
                if (cellDataGenerator) {
                    // 根据cell的data函数，生成新的cellData，并更新tableData
                    settings.cellData = cellDataGenerator(this.data, rowIndex, realColIndex, this._additionalData);
                    this._setCellDataByField(field, rowIndex, settings.cellData);
                } else {
                    settings.cellData = this._getCellDataByField(field, rowIndex);
                }
                settings.cellData = CommonUtils.isDefined(settings.cellData) ? settings.cellData : '';

                // generate a tooltip if necessary
                const tooltipGenerator = TableUtils.getGenerator(columnDefine, 'tooltip');
                if (tooltipGenerator) {
                    settings.tooltip = tooltipGenerator(this.data, rowIndex, realColIndex, this._additionalData);
                } else if (columnDefine.cell && CommonUtils.isDefined(columnDefine.cell.tooltip)) {
                    settings.tooltip = columnDefine.cell.tooltip;
                } else {
                    settings.tooltip = '';
                }

                // 修改settings的group属性
                if (columnDefine.group) {
                    if (groupSetting && groupSetting.cellData == settings.cellData) {
                        groupSetting.rowSpan++;
                        settings.rowSpan = 0;
                    } else {
                        groupSetting = settings;
                    }
                }
            }
        });
    }

    /**
     * 生成混合后的列定义序列
     * @returns {ColumnDefine[]}
     * @private
     */
    private _getMixedColumnDefines(): ColumnDefine[] {
        if (!this.data) {
            return [];
        }
        const columnDefines: ColumnDefine[] = [];
        this.data.field.forEach((field, index) => {
            let cd = this._columnDefineGenerator(field, index);
            if (cd) {
                cd = <ColumnDefine>CommonUtils.shallowCopy(cd);
                cd.target = field;
            }
            columnDefines.push(cd ? cd : {target: field});
        });

        if (this._additionalColumnDefines) {
            for (let i = this._additionalColumnDefines.length - 1; i >= 0; i--) {
                const acd = this._additionalColumnDefines[i];
                const cd: ColumnDefine = {
                    target: 'additional-field-' + i, header: acd.header, group: acd.group,
                    cell: acd.cell, width: acd.width, visible: acd.visible
                };
                const pos = CommonUtils.isDefined(acd.pos) ? acd.pos : columnDefines.length;
                columnDefines.splice(pos, 0, cd);
            }
        }
        return columnDefines;
    }

    public update(): void {
        if (!this.initialized || !this._data) {
            return;
        }
        if (!this._data.field || this._data.field.length == 0) {
            console.warn('invalid table data, need a "field" property.');
            return;
        }

        const columnDefines = this._getMixedColumnDefines();
        this._updateHeaderSettings(columnDefines);
        this._updateCellSettings(columnDefines);

        setTimeout(() => {
            // 等待additionalTableData在renderer更新完成
            this.additionalDataChange.emit(this.additionalData);
            // 等待滚动条初始化
            this._handleScrollBar();
        }, 0);
    }

    private _additionalData = new AdditionalTableData();

    @Input()
    public get additionalData(): TableData {
        return this._additionalData;
    }

    public set additionalData(value: TableData) {
        //ignore incoming data.
    }

    @Output()
    public additionalDataChange = new EventEmitter<TableData>();

    private _trackRowBy: string;

    @Input()
    public get trackRowBy(): string {
        return this._trackRowBy;
    }

    public set trackRowBy(value: string) {
        this._trackRowBy = value;
        this._additionalData.trackRowBy = value;
    }

    private _removeTableDataRefresh: CallbackRemoval;
    private _removeAdditionalDataRefresh: CallbackRemoval;
    private _data: TableData;

    @Input()
    public get data(): TableData {
        return this._data;
    }

    public set data(value: TableData) {
        if (value == this._data || !value) {
            return;
        }
        this._data = value;
        this._additionalData.data.splice(0, this._additionalData.data.length);
        this._additionalData.clearCachedValues();
        this._additionalData.originData = value;

        this.update();

        if (this._removeTableDataRefresh) {
            this._removeTableDataRefresh();
        }
        this._removeTableDataRefresh = value.onRefresh(this.update, this);

        if (!this._removeAdditionalDataRefresh) {
            this._removeAdditionalDataRefresh = this._additionalData.onRefresh(this.update, this);
        }
    }

    @Output()
    public dataChange = new EventEmitter<TableDataChangeEvent>();

    @Input()
    public columnDefines: ColumnDefine[] | ColumnDefineGenerator;

    @Input()
    public columnDefineGeneratorContext: any;

    private _additionalColumnDefines: AdditionalColumnDefine[] = [];

    @Input()
    public get additionalColumnDefines(): AdditionalColumnDefine[] {
        return this._additionalColumnDefines;
    }

    public set additionalColumnDefines(value: AdditionalColumnDefine[]) {
        this._additionalColumnDefines = value;
        this._initAdditionalData();
    }

    private _columnDefineGenerator(field: string, index: number): ColumnDefine {
        if (!this.columnDefines) {
            return undefined;
        }
        if (this.columnDefines instanceof Function) {
            return CommonUtils.safeInvokeCallback(this.columnDefineGeneratorContext, this.columnDefines, [field, index]);
        } else {
            return this.columnDefines.find(colDef => {
                const targets: (number | string)[] = colDef.target instanceof Array ? colDef.target : [colDef.target];
                const idx = targets.findIndex(target =>
                    (typeof target === 'number' && target === index) || (typeof target === 'string' && target === field));
                return idx != -1;
            });
        }
    }

    @Output()
    public doubleClick: EventEmitter<number> = new EventEmitter<number>();

    /**
     * @internal
     */
    public _$handleRowDoubleClick(rowIndex: number) {
        this.doubleClick.emit(rowIndex);
    }

    @ViewChildren('tableRow', {read: ElementRef})
    private _rowElementRefs: QueryList<ElementRef>;

    /**
     * @internal
     */
    public _$selectRow(rowIndex: number, suppressEvent: boolean = false) {
        this._rowElementRefs.forEach((row, index) => {
            if (index === rowIndex) {
                this._renderer.addClass(row.nativeElement, 'jigsaw-table-row-selected');
                if (!suppressEvent) {
                    this.selectChange.emit(rowIndex);
                }
            } else {
                this._renderer.removeClass(row.nativeElement, 'jigsaw-table-row-selected');
            }
        })
    }

    // /**
    //  * 一旦数据有更新，表格将自动对已经设置了排序的行做自动排序处理。在某些情况下会很方便，但是在表格数据量大的时候，可能会有性能问题，
    //  * 表格数据量大的时候，最好关闭这个选项，由应用自行对`data`属性做排序。也可以不自动排序，由用户自行点击列头触发行排序
    //  *
    //  * @type {boolean}
    //  */
    // @Input()
    // public autoSort: boolean = false;
    //
    // private _sortedColumn: number = -1;
    // private _sortedOrder: SortOrder;
    //
    // private _sortColumn(): void {
    //     if (!this.autoSort) {
    //         return;
    //     }
    //     let headSetting = this._$headerSettings.find(headSetting => headSetting.sortable &&
    //         (headSetting.defaultSortOrder == SortOrder.asc || headSetting.defaultSortOrder == SortOrder.des)
    //     );
    //     // if (headSetting) {
    //     //     this._sortedColumn = headSetting.field;
    //     // }
    //     this.data.sort(headSetting.sortAs, headSetting.defaultSortOrder, headSetting.field);
    // }

    @Input()
    public floatingHeader: boolean = false;

    private _removeWindowScrollListener: Function;
    private _removeWindowResizeListener: Function;

    private _addWindowListener() {
        this._removeWindowListener();

        this._zone.runOutsideAngular(() => {
            this._removeWindowResizeListener = this._renderer.listen(
                'window', 'resize', () => this.resize());
        });

        if (this.floatingHeader && !this.hideHeader) {
            this._zone.runOutsideAngular(() => {
                this._removeWindowScrollListener = this._renderer.listen(
                    'window', 'scroll', () => this._fixHeaderTop());
            });
        }
    }

    public resize() {
        this._fixHeaderTop();
        this._handleScrollBar();
        this._setVerticalScrollbarOffset();
    }

    private _tableHeaderElement: HTMLElement;

    private _fixHeaderTop() {
        if (!this.floatingHeader || this.hideHeader) {
            return;
        }
        const maxTop = this._elementRef.nativeElement.offsetHeight - this._tableHeaderElement.offsetHeight;
        let tableDocumentTop = AffixUtils.offset(this._elementRef.nativeElement).top;
        let scrollTop = AffixUtils.getScrollTop();
        let top = scrollTop - tableDocumentTop;
        if (top > 0 && top < maxTop) {
            this._renderer.setStyle(this._tableHeaderElement, 'top', top + 'px');
        } else if (top <= 0) {
            if (this._tableHeaderElement.style.top !== '0' && this._tableHeaderElement.style.top !== '0px') {
                this._renderer.setStyle(this._tableHeaderElement, 'top', '0');
            }
        } else if (top >= maxTop) {
            // table超出屏幕显示位置
        }
    }

    private _removeWindowListener() {
        if (this._removeWindowScrollListener) {
            this._removeWindowScrollListener();
            this._removeWindowScrollListener = null;
        }
        if (this._removeWindowResizeListener) {
            this._removeWindowResizeListener();
            this._removeWindowResizeListener = null;
        }
    }

    @ViewChildren(JigsawTableHeaderInternalComponent)
    private _headerComponents: QueryList<JigsawTableHeaderInternalComponent>;

    /**
     * @internal
     */
    public _$onSort(sortInfo): void {
        this._headerComponents.forEach(comp => sortInfo.field != comp.field && comp.updateSortOrderClass(SortOrder.default));
        this.sort.emit(sortInfo);
    }

    private _initAdditionalData(): void {
        if (!this._additionalColumnDefines) {
            return;
        }
        this._additionalData.field = [];
        this._additionalData.header = [];
        this._additionalColumnDefines.forEach((acd, i) => {
            this._additionalData.field.push('additional-field-' + i);
            this._additionalData.header.push(acd.header.text);
        });
    }

    @ViewChild('contentScrollbar', {read: PerfectScrollbarDirective})
    public contentScrollbar: PerfectScrollbarDirective;

    @ViewChild('bodyScrollbar', {read: PerfectScrollbarDirective})
    private _bodyScrollbar: PerfectScrollbarDirective;

    /**
     * 根据内容计算自适应列宽
     * @private
     */
    private _calculateContentWidth() {
        if (this.contentWidth == 'auto') {
            const host = this._elementRef.nativeElement;
            host.querySelectorAll('table').forEach(table => {
                this._renderer.setStyle(table, 'table-layout', 'auto');
            });

            // 设置表头随内容撑开
            this._renderer.setStyle(host.querySelector('.jigsaw-table-header'), 'width', 'auto');
            this._renderer.setStyle(host.querySelector('.jigsaw-table-header'), 'white-space', 'nowrap');

            this._renderer.setStyle(host.querySelector('.jigsaw-table-body'), 'width', 'auto');
            this._renderer.setStyle(host.querySelector('.jigsaw-table-body-range'), 'width', '100%');

            const tHeadColGroup = host.querySelectorAll('.jigsaw-table-header colgroup col');
            const tBodyColGroup = host.querySelectorAll('.jigsaw-table-body colgroup col');
            const widthStorage = [];

            // 清空col的width
            tHeadColGroup.forEach(col => col.setAttribute('width', ''));
            tBodyColGroup.forEach(col => col.setAttribute('width', ''));

            host.querySelectorAll('.jigsaw-table-body tbody tr:first-child td')
                .forEach(td => widthStorage.push(td.offsetWidth));

            host.querySelectorAll('.jigsaw-table-header thead tr:first-child td')
                .forEach((td, index) => {
                    if (td.offsetWidth > widthStorage[index]) {
                        widthStorage[index] = td.offsetWidth;
                    }
                });

            widthStorage.forEach((width, index) => {
                // columnDefine定义过的列宽不会被覆盖
                const colWidth = this._$headerSettings && this._$headerSettings[index].width ? this._$headerSettings[index].width : width;
                tHeadColGroup[index].setAttribute('width', colWidth);
                tBodyColGroup[index].setAttribute('width', colWidth);
            });

            // 还原
            host.querySelectorAll('table').forEach(table => {
                this._renderer.setStyle(table, 'table-layout', 'fixed');
            });
            this._renderer.setStyle(host.querySelector('.jigsaw-table-header'), 'width', '100%');
            this._renderer.setStyle(host.querySelector('.jigsaw-table-header'), 'white-space', 'normal');
            this._renderer.setStyle(host.querySelector('.jigsaw-table-body'), 'width', '100%');
        }
    }

    /**
     * 处理滚动条
     * @private
     */
    private _handleScrollBar() {
        this._calculateContentWidth();
        this._calibrateTable();
        this._updateScrollbar();
    }

    /**
     * 校正表头表体的宽度
     * @private
     */
    private _calibrateTable() {
        const host = this._elementRef.nativeElement;
        const tableHeader = host.querySelector('table.jigsaw-table-header');
        const tableBody = host.querySelector('table.jigsaw-table-body');
        const tableBodyRange = host.querySelector('.jigsaw-table-body-range');
        const tableRange = host.querySelector('.jigsaw-table-range');

        // table body's width is always not less than the host component
        if (host.offsetWidth > tableBody.offsetWidth) {
            this._renderer.setStyle(tableBody, 'width', host.offsetWidth + 'px');
        }

        // table body range's width is always equal to table body's
        if (tableBodyRange.offsetWidth != tableBody.offsetWidth) {
            this._renderer.setStyle(tableBodyRange, 'width', tableBody.offsetWidth + 'px');
        }

        // table header's width is always equal to table body's
        if (tableHeader.offsetWidth != tableBody.offsetWidth) {
            this._renderer.setStyle(tableHeader, 'width', tableBody.offsetWidth + 'px');
        }

        // 根据表头的高度，设置表体的padding-top
        if (this.hideHeader) {
            this._renderer.setStyle(tableRange, 'padding-top', 0);
        } else {
            this._renderer.setStyle(tableRange, 'padding-top', tableHeader.offsetHeight + 'px');
        }
    }

    private _yScrollbarElement: HTMLElement;

    /**
     * 设置纵向滚动条位置
     * @private
     */
    private _setVerticalScrollbarOffset() {
        if (this._yScrollbarElement) {
            this._renderer.setStyle(this._yScrollbarElement, 'left',
                this._elementRef.nativeElement.offsetWidth + this.contentScrollbar.geometry().x - 15 + 'px');
        }
    }

    /**
     * 找到纵向滚动条，并设置初始位置
     * @private
     */
    private _initVerticalScroll() {
        setTimeout(() => {
            // selector使用>选择直接子元素，避免选择到其他滚动条
            const yScrollbar = this._elementRef.nativeElement.querySelector('.jigsaw-table-body-range > .ps__rail-y');
            if (yScrollbar) {
                this._renderer.setStyle(yScrollbar, 'left',
                    this._elementRef.nativeElement.offsetWidth - 15 + 'px');
                this._yScrollbarElement = yScrollbar;
            } else {
                this._initVerticalScroll();
            }
        }, 0);
    }

    /**
     * 当内容数据变化时，刷新一下滚动条
     * @private
     */
    private _updateScrollbar() {
        if (this.contentScrollbar) {
            this.contentScrollbar.update();
        }
        if (this._bodyScrollbar) {
            this._bodyScrollbar.update();
        }
    }

    private _removeHorizontalScrollListener: Function;

    /**
     * 监听横向滚动事件，更新纵向滚动条的位置
     * @private
     */
    private _listenHorizontalScroll() {
        if (!this.contentScrollbar) {
            return;
        }
        this._zone.runOutsideAngular(() => {
            const el = this.contentScrollbar.elementRef.nativeElement;
            this._removeHorizontalScrollListener = this._renderer.listen(
                el, 'ps-scroll-x', () => this._setVerticalScrollbarOffset());
        });
    }

    ngAfterViewInit() {
        this._$selectRow(this.selectedRow, true);

        // 初始化滚动条
        this._initVerticalScroll();
        this._listenHorizontalScroll();
    }

    ngOnInit() {
        super.ngOnInit();

        if (this._data && this._data.field && this._data.field.length != 0) {
            this.update();
        }

        this._addWindowListener();

        this._renderer.setStyle(this._elementRef.nativeElement.querySelector('.jigsaw-table-body-range'),
            'max-height', this._maxHeight);
        this._tableHeaderElement = this._elementRef.nativeElement.querySelector(".jigsaw-table-header");
    }

    ngOnDestroy() {
        super.ngOnDestroy();

        if (this._removeTableDataRefresh) {
            this._removeTableDataRefresh();
            this._removeTableDataRefresh = null;
        }
        if (this._removeAdditionalDataRefresh) {
            this._removeAdditionalDataRefresh();
            this._removeAdditionalDataRefresh = null;
        }
        if (this._removeHorizontalScrollListener) {
            this._removeHorizontalScrollListener();
            this._removeHorizontalScrollListener = null;
        }
        this._removeWindowListener();

        this.columnDefines = null;
        this._additionalColumnDefines = null;
        this._data = null;
        this._headerSettingsBackup = null;
        this._cellSettingsBackup = null;
        this._$cellSettings = null;
        this._$headerSettings = null;
        this._tableHeaderElement = null;
        this._rowElementRefs = null;
        this._headerComponents = null;
    }
}

@NgModule({
    declarations: [JigsawTable, JigsawTableCellInternalComponent, JigsawTableHeaderInternalComponent],
    imports: [CommonModule, JigsawCommonModule, JigsawTableRendererModule, PerfectScrollbarModule],
    exports: [JigsawTable, JigsawTableCellInternalComponent, JigsawTableHeaderInternalComponent],
    entryComponents: [TableCellTextEditorRenderer, DefaultCellRenderer]
})
export class JigsawTableModule {
}
