import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Injector,
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
import {Subscription} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";
import {PerfectScrollbarDirective, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {AbstractJigsawComponent, JigsawCommonModule, WingsTheme} from "../../common/common";
import {JigsawTableCellInternalComponent, JigsawTableHeaderInternalComponent, JigsawTableHeaderFilterBox} from "./table-inner.components";
import {BigTableData, LocalPageableTableData, TableData} from "../../common/core/data/table-data";
import {AffixUtils} from "../../common/core/utils/internal-utils";
import {
    _getColumnIndex,
    AdditionalColumnDefine,
    AdditionalTableData,
    ColumnDefine,
    ColumnDefineGenerator,
    SortChangeEvent,
    TableStyleOptions,
    TableCellSetting,
    TableDataChangeEvent,
    TableHeadSetting, TableRowExpandOptions
} from "./table-typings";
import {CallbackRemoval, CommonUtils} from "../../common/core/utils/common-utils";
import {IPageable, PagingInfo, SortOrder} from "../../common/core/data/component-data";
import {JigsawTrustedHtmlModule, TrustedHtmlHelper} from "../../common/directive/trusted-html/trusted-html";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {DefaultCellRenderer, JigsawTableRendererModule, TableCellTextEditorRenderer} from "./table-renderer";
import {TableUtils} from "./table-utils";
import { JigsawFloatModule } from "../../common/directive/float/float";
import { JigsawButtonModule } from "../button/button";
import { JigsawListModule } from "../list-and-tile/list";
import { JigsawCheckBoxModule } from "../checkbox/index";
import { JigsawSearchInputModule } from "../input/search-input";
import {TranslateHelper} from "../../common/core/utils/translate-helper";
import { JigsawLoadingModule } from "../../common/components/loading/loading";
import {HeaderFilter} from "../../common/core/data/unified-paging/paging";
import {JigsawThemeService} from "../../common/core/theming/theme";


@WingsTheme('table.scss')
@Component({
    selector: 'jigsaw-table, j-table',
    templateUrl: 'table.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.background]': 'styleOptions?.hostStyle?.background',
        '[style.borderTopWidth]': 'styleOptions?.hostStyle?.borderTopWidth',
        '[style.borderRightWidth]': 'styleOptions?.hostStyle?.borderRightWidth',
        '[style.borderBottomWidth]': 'styleOptions?.hostStyle?.borderBottomWidth',
        '[style.borderLeftWidth]': 'styleOptions?.hostStyle?.borderLeftWidth',
        '[style.borderStyle]': 'styleOptions?.hostStyle?.borderStyle',
        '[style.borderColor]': 'styleOptions?.hostStyle?.borderColor',
        '[style.borderRadius]': 'styleOptions?.hostStyle?.borderRadius',
        '[style.boxShadow]': 'styleOptions?.hostStyle?.boxShadow',
        '[style.opacity]':'styleOptions?.hostStyle?.opacity',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-table-host]': 'true',
        '[class.jigsaw-table-ff]': '_$isFFBrowser',
        '[class.jigsaw-table-column-resizable]': 'columnResizable',
        '[class.jigsaw-table-resizing]': '_$resizing',
        '[class.jigsaw-table-hide-column-dividers]': 'hideColumnDividers',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTable extends AbstractJigsawComponent implements OnInit, AfterViewInit, OnDestroy {

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef,
                protected _zone: NgZone, private _changeDetectorRef: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector, private _themeService: JigsawThemeService) {
        super();
        if (CommonUtils.getBrowserType() == 'Firefox') {
            this._$isFFBrowser = true;
        }
        TrustedHtmlHelper.init(_zone);
    }

    /**
     * @internal
     */
    public _$isFFBrowser;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get width(): string {
        return this._width;
    }

    public set width(value: string) {
        this._width = CommonUtils.getCssValue(value);
        this.runMicrotask(this.resize, this);
    }

    @Output()
    public sort = new EventEmitter<SortChangeEvent>();

    @Output()
    public headerFilterChange = new EventEmitter<HeaderFilter>();

    private _contentWidth: string = 'auto';

    /**
     * @NoMarkForCheckRequired
     * 当值为'_inner_auto_'时，会根据表头内容自动伸展，可能会自动产生横向滚动条，但无法设置列宽，列宽没有响应性
     * 当值为'auto'或具体的值时，默认按照表格宽度平均分配列宽，当设置列宽为'byContent'时，会根据列的内容计算宽度，也可以直接设置列的宽度
     */
    @Input()
    public get contentWidth(): string {
        return this._contentWidth;
    }

    public set contentWidth(value: string) {
        this._contentWidth = CommonUtils.getCssValue(value);
    }

    @Input()
    @RequireMarkForCheck()
    public hideHeader: boolean = false;

    private _autoFillUp: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get autoFillUp(): boolean {
        return this._autoFillUp;
    }

    public set autoFillUp(value: boolean) {
        this._autoFillUp = value;
        this._updateFillUpBlankRow();
    }

    private _selectedRow: number;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get selectedRow(): number {
        return this._selectedRow;
    }

    public set selectedRow(value: number) {
        if (this._selectedRow === value) {
            return;
        }
        this._selectedRow = value;
        if (this.initialized) {
            this._selectRow(value);
        }
    }

    private _styleOptions: TableStyleOptions;

    /**
     * 设置表格样式
     * @NoMarkForCheckRequired
    */
    @Input()
    public get styleOptions(): TableStyleOptions {
        return this._styleOptions;
    }

    public set styleOptions(value: TableStyleOptions) {
        if (this._styleOptions === value) {
            return;
        }
        this._styleOptions = value;
        this._changeDetectorRef.detectChanges();
    }

    /**
     * @internal
     */
    public _$hoveredRow: number;

    /**
     * @internal
     */
    public _$getTrStyle(index: number): {background: string} {
        let background;
        if (index == this.selectedRow) {
            background = this.styleOptions?.bodyTrStyle?.selectedBackground || this.styleOptions?.bodyTrStyle?.background || 'var(--brand-active-lighten)';
        } else if (index == this._$hoveredRow) {
            background = this.styleOptions?.bodyTrStyle?.hoverBackground || this.styleOptions?.bodyTrStyle?.background || 'var(--bg-hover)';
        } else if (index % 2 === 0) {
            background = this.styleOptions?.bodyTrStyle?.evenBackground || this.styleOptions?.bodyTrStyle?.background || 'unset';
        } else if (index % 2 === 1) {
            background = this.styleOptions?.bodyTrStyle?.oddBackground || this.styleOptions?.bodyTrStyle?.background || 'unset';
        } else {
            return undefined;
        }
        return {background};
    }

    /**
     * @internal
     */
    public _$getHeaderClass(head: TableHeadSetting) {
        const alignment = head.alignment == 'default' && this.styleOptions?.headerCellStyle?.horizontalAlignment ?
            this.styleOptions?.headerCellStyle?.horizontalAlignment : head.alignment;
        return {
            'jigsaw-cell-align-left': alignment == 'left',
            'jigsaw-cell-align-center': alignment == 'center',
            'jigsaw-cell-align-right': alignment == 'right',
            'jigsaw-cell-align-default': alignment == 'default',
            'jigsaw-cell-no-padding': head.noPadding
        };
    }

    /**
     * @internal
     */
    public _$getBodyClass(cell: TableCellSetting) {
        const alignment = cell.alignment == 'default' && this.styleOptions?.bodyCellStyle?.horizontalAlignment ?
            this.styleOptions?.bodyCellStyle?.horizontalAlignment : cell.alignment;
        return {
            'jigsaw-cell-align-left': alignment == 'left',
            'jigsaw-cell-align-center': alignment == 'center',
            'jigsaw-cell-align-right': alignment == 'right',
            'jigsaw-cell-align-default': alignment == 'default',
            'jigsaw-cell-no-padding': cell.noPadding
        };
    }

    public updateStyleOptions() {
        this.resize();
        this._changeDetectorRef.detectChanges();
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public columnResizable: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public hideColumnDividers: boolean = false;

    /**
     * @internal
     */
    public _$resizing: boolean = false;

    @Output()
    public selectChange: EventEmitter<number> = new EventEmitter<number>();
    @Output()
    public selectedRowChange: EventEmitter<number> = new EventEmitter<number>();
    @Output()
    public rowExpand: EventEmitter<number> = new EventEmitter<number>();

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

    @ViewChild('columnResizeLine')
    private _columnResizeLine: ElementRef;

    @ViewChildren('tableHeaderCell', {read: ElementRef})
    private _tableHeaderCell: QueryList<ElementRef>;

    @ViewChild('tableRange')
    private _tableRange: ElementRef;

    /**
     * @internal
     */
    public _$resizeColumn(e: MouseEvent, index: number) {
        this._$resizing = true;
        const tablePos = this._tableRange.nativeElement.getBoundingClientRect();
        const tableLeft = tablePos.x;
        const scaleRatio = tablePos.width / this._tableRange.nativeElement.offsetWidth;
        const preCell = this._tableHeaderCell.toArray()[index];
        const nextCell = this._tableHeaderCell.toArray()[index + 1];
        const preCellLeft = preCell.nativeElement.getBoundingClientRect().x;
        const nextCellRight = nextCell.nativeElement.getBoundingClientRect().right;
        this._renderer.setStyle(this._columnResizeLine.nativeElement, 'left', (e.x - tableLeft) / scaleRatio + 'px');
        const mousemoveListener = (e: MouseEvent) => {
            const calcLeft = Math.min(Math.max(e.x, preCellLeft + 40), nextCellRight - 40);
            this._renderer.setStyle(this._columnResizeLine.nativeElement, 'left', (calcLeft - tableLeft) / scaleRatio + 'px');
        }
        window.addEventListener('mousemove', mousemoveListener);
        window.addEventListener('mouseup', (e: MouseEvent) => {
            this._$resizing = false;
            window.removeEventListener("mousemove", mousemoveListener);
            const calcLeft = Math.min(Math.max(e.x, preCellLeft + 40), nextCellRight - 40);
            const preWidth = (calcLeft - preCellLeft) / scaleRatio;
            const nextWidth = (nextCellRight - calcLeft) / scaleRatio;
            this._updateColumnWidth(index, preWidth, nextWidth);
            this.resize();
        }, { once: true });
    }

    @ViewChildren('tableHeaderColgroup', { read: ElementRef })
    private _tableHeaderColgroup: QueryList<ElementRef>;

    @ViewChildren('tableBodyHeaderColgroup', { read: ElementRef })
    private _tableBodyHeaderColgroup: QueryList<ElementRef>;

    private _updateColumnWidth(index: number, preWidth: number, nextWidth: number) {
        this._renderer.setStyle(this._tableHeaderColgroup.toArray()[index].nativeElement, 'width', preWidth + 'px');
        this._renderer.setStyle(this._tableHeaderColgroup.toArray()[index + 1].nativeElement, 'width', nextWidth + 'px');
        this._renderer.setStyle(this._tableBodyHeaderColgroup.toArray()[index].nativeElement, 'width', preWidth + 'px');
        this._renderer.setStyle(this._tableBodyHeaderColgroup.toArray()[index + 1].nativeElement, 'width', nextWidth + 'px');
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
            const [realColIndex,] = this._getColumnIndex(field);
            let settings = oldBackup[field];
            settings = TableUtils.updateHeaderSettings(columnDefine, settings);
            let headerData = columnDefine.header && columnDefine.header.data ? columnDefine.header.data : null;
            if (headerData instanceof Function) {
                settings.cellData = headerData(this.data, realColIndex, this._additionalData);
            } else if (typeof headerData == 'string') {
                settings.cellData = headerData;
            } else {
                settings.cellData = this._getHeaderValueByField(field);
            }
            this._$headerSettings.push(settings);
            this._headerSettingsBackup[field] = settings;
        });
    }

    /**
     * 没有cellData generator获取数据的情况
     * @param field
     * @param row
     *
     *
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

    private _updateAdditionalData(field: string, row: number, cellData: string) {
        let [index, tableData] = this._getColumnIndex(field);
        if (index == -1) {
            console.error('no cell data found, unknown field: ' + field);
            return;
        }
        if (!tableData.data[row]) {
            tableData.data[row] = [];
        }
        if (tableData instanceof AdditionalTableData) {
            tableData.data[row][index] = cellData;
        }
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
        const lengthBefore = this._$cellSettings.length;
        this._$cellSettings.splice(dataLen, lengthBefore);
        this._additionalData.data.splice(dataLen, lengthBefore);

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
                    settings.cellData = cellDataGenerator(this.data, rowIndex, realColIndex, this._additionalData);
                    this._updateAdditionalData(field, rowIndex, settings.cellData);
                } else if (columnDefine.cell && typeof columnDefine.cell.data == 'string') {
                    settings.cellData = columnDefine.cell.data;
                    this._updateAdditionalData(field, rowIndex, settings.cellData);
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
     * @internal
     */
    public _$blankRow:string[] = [];

    private _updateFillUpBlankRow(): void {
        this._$blankRow = [];
        this._changeDetectorRef.detectChanges();

        if (!this.autoFillUp) {
            return;
        }

        const data: IPageable = <any>this.data;
        if (data?.hasOwnProperty('pagingInfo') && data?.pagingInfo.totalPage > 1) {
            return;
        }

        if (this.height === undefined || this._$cellSettings.length === 0) {
            return;
        }
        const tableRows = this._elementRef.nativeElement.querySelectorAll(".jigsaw-table-body-range > .jigsaw-table-body > tbody > tr");
        if (!tableRows) {
            return;
        }
        const lastRowEle = tableRows[this._$cellSettings.length - 1];
        if (!lastRowEle) {
            return;
        }
        const bodyRangeEle = this._elementRef.nativeElement.querySelector(".jigsaw-table-body-range");
        if (!bodyRangeEle) {
            return;
        }
        const bodyBottom = bodyRangeEle.getBoundingClientRect().bottom;
        const bodyScroll = bodyRangeEle.scrollTop;
        const validBottom = lastRowEle.getBoundingClientRect().bottom + bodyScroll;
        const height = bodyBottom - validBottom - 1;
        const rowGap = Math.floor(height / 32);
        if (rowGap <= 0) {
            return;
        }
        this._$blankRow = Array(rowGap).fill("");
        this._changeDetectorRef.detectChanges();
    }

    private _updateAutoPageSizing(): void {
        const data: IPageable = <any>this.data;
        if (!(data?.pagingInfo instanceof PagingInfo) || !data?.pagingInfo.autoPageSizing) {
            return;
        }
        const tableEle = this._elementRef.nativeElement.querySelector(".jigsaw-table-range");
        if (!tableEle) {
            return;
        }
        const bodyHeight = tableEle.getBoundingClientRect().bottom - tableEle.getBoundingClientRect().top;
        const containerSize = this.hideHeader ? bodyHeight - 1 : bodyHeight - 34;
        if (!isNaN(data.pagingInfo.containerHeight) && data.pagingInfo.containerHeight === containerSize) {
            return
        }
        data.pagingInfo.containerHeight = containerSize;
    }

    private _updateFrozenColumns() {
        this._clearFreezeStyle();
        this._setHeaderScrollLeft();
        // BigTableData的实现原理不适用于此冻结列功能
        if (this.data instanceof BigTableData) {
            this.frozenLeftColumns = 0;
            this.frozenRightColumns = 0;
            this._changeDetectorRef.detectChanges();
            return;
        }

        // 没有滚动条就不需要设置列冻结了
        const content = this.contentScrollbar.elementRef.nativeElement;
        if (content.scrollWidth <= content.clientWidth) {
            return;
        }

        if (!this.hideHeader) {
            const headers = this._headerRowElementRefs.first.nativeElement.querySelectorAll('td');
            this._setLeftFreeze(headers);
            this._setRightFreeze(headers);
        }

        this._rowElementRefs.forEach(row => {
            const tds = row.nativeElement.querySelectorAll('td');
            this._setLeftFreeze(tds);
            this._setRightFreeze(tds);
        })
    }

    private _setLeftFreeze(tds) {
        if (isNaN(this.frozenLeftColumns) || this.frozenLeftColumns <= 0) {
            return;
        }
        let leftOffset = 0;
        const max = Math.min(this.frozenLeftColumns, tds.length);
        for (let i = 0; i < max; i++) {
            tds[i].classList.add("jigsaw-cell-freeze");
            tds[i].style.left = leftOffset + 'px';
            leftOffset += tds[i].offsetWidth;
        }
    }

    private _setRightFreeze(tds) {
        if (isNaN(this.frozenRightColumns) || this.frozenRightColumns <= 0) {
            return;
        }
        let rightOffset = 0;
        const min = tds.length - 1 - this.frozenRightColumns;
        for (let i = tds.length - 1; i > min; i--) {
            tds[i].classList.add("jigsaw-cell-freeze");
            tds[i].style.right = rightOffset + 'px';
            rightOffset += tds[i].offsetWidth;
        }
    }

    private _clearFreezeStyle() {
        if (!this.hideHeader) {
            const headers = this._headerRowElementRefs.first.nativeElement.querySelectorAll('td.jigsaw-cell-freeze');
            headers.forEach(cell => {
                cell.style.removeProperty('left');
                cell.style.removeProperty('right');
                cell.classList.remove('jigsaw-cell-freeze');
            });
        }

        this._rowElementRefs.forEach(row => {
            const tds = row.nativeElement.querySelectorAll('td.jigsaw-cell-freeze');
            tds.forEach(cell => {
                cell.style.removeProperty('left');
                cell.style.removeProperty('right');
                cell.classList.remove('jigsaw-cell-freeze');
            });
        })
    }

    /**
     * 生成混合后的列定义序列
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
                    cell: acd.cell, width: acd.width, visible: acd.visible, maxWidth: acd.maxWidth
                };
                const pos = CommonUtils.isDefined(acd.pos) ? acd.pos : columnDefines.length;
                columnDefines.splice(pos, 0, cd);
            }
        }
        return columnDefines;
    }

    public update(isFromAdditional?: boolean): void {
        if (!this.initialized || !this._data) {
            return;
        }
        if (!this._data.field || this._data.field.length == 0) {
            console.warn('invalid table data, need a "field" property.');
            return;
        }

        const columnDefines = this._getMixedColumnDefines();
        this._initAdditionalData();
        this._updateHeaderSettings(columnDefines);
        this._updateCellSettings(columnDefines);
        this._changeDetectorRef.detectChanges();

        this.runMicrotask(() => {
            // 自动添加空白行
            this._updateFillUpBlankRow();
            // 自动分页
            this._updateAutoPageSizing();
            // 等待additionalTableData在renderer更新完成
            this.additionalDataChange.emit(this.additionalData);
            // 等待滚动条初始化
            this._handleScrollBar();
            // 自动再次标记选中行
            this._selectRow(this.selectedRow);
            // 设置冻结列
            this._updateFrozenColumns();
            // 关闭所有展开行
            if (isFromAdditional) {
                return;
            }
            this._clearExpansion();
        })
    }

    private _additionalData = new AdditionalTableData();

    /**
     * @NoMarkForCheckRequired
     */
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

    /**
     * @NoMarkForCheckRequired
     */
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

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): TableData {
        return this._data;
    }

    public set data(value: TableData) {
        if (value == this._data || !value) {
            return;
        }
        this._data = value;
        this._additionalData.reset();
        this._additionalData.originData = value;

        this.update();

        if (this._removeTableDataRefresh) {
            this._removeTableDataRefresh();
        }
        this._removeTableDataRefresh = value.onRefresh(() => this.update());

        if (!this._removeAdditionalDataRefresh) {
            this._removeAdditionalDataRefresh = this._additionalData.onRefresh(() => this.update(true));
        }
    }

    @Output()
    public edit = new EventEmitter<TableDataChangeEvent>();

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public columnDefines: ColumnDefine[] | ColumnDefineGenerator;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public columnDefineGeneratorContext: any;

    private _additionalColumnDefines: AdditionalColumnDefine[] = [];

    /**
     * @NoMarkForCheckRequired
     */
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

    @ViewChildren('headerRow', {read: ElementRef})
    private _headerRowElementRefs: QueryList<ElementRef>;

    public scrollRowIntoView(rowIndex: number, autoSelect: boolean = true): void {
        const row = this._rowElementRefs?.find((_, idx) => idx == rowIndex);
        if (!row) {
            console.warn('unable to find row element by index', rowIndex);
            return;
        }
        row.nativeElement.scrollIntoView({block: "center", inline: "nearest"});
        if (autoSelect) {
            this.selectedRow = rowIndex;
        }
    }

    /**
     * @internal
     */
    public _$clickRow(rowIndex: number) {
        this.rowExpand.emit(rowIndex);
        if (this._selectedRow === rowIndex) {
            return;
        }
        this._selectedRow = rowIndex;
        this._selectRow(rowIndex);
    }

    private _selectRow(rowIndex: number, suppressEvent: boolean = false) {
        if (!this._$cellSettings.length || rowIndex > this._$cellSettings.length) {
            return;
        }
        this._rowElementRefs.forEach((row, index) => {
            if (index === rowIndex) {
                this._renderer.addClass(row.nativeElement, 'jigsaw-table-row-selected');
                if (!suppressEvent) {
                    this.selectChange.emit(rowIndex);
                    this.selectedRowChange.emit(rowIndex);
                }
            } else {
                this._renderer.removeClass(row.nativeElement, 'jigsaw-table-row-selected');
            }
        });
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public floatingHeader: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public frozenLeftColumns: number = 0;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public frozenRightColumns: number = 0;

    private _removeWindowScrollListener: Function;
    private _removeWindowResizeListener: Function;
    private _themeChangeSubscription: Subscription;
    private _currentPageChangeSubscription: Subscription;

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

        this._themeChangeSubscription?.unsubscribe();
        this._themeChangeSubscription = this._themeService.themeChange.subscribe(() => {
            this._handleScrollBar();
        });

        const data: IPageable = <any>this.data;
        if (!(data?.pagingInfo instanceof PagingInfo)) {
            return;
        }
        this._currentPageChangeSubscription?.unsubscribe();
        this._currentPageChangeSubscription = data.pagingInfo.subscribe(() => {
            if (this.data instanceof LocalPageableTableData) {
                this.contentScrollbar.scrollToTop();
                return;
            }
            // 这里如果不是本地分页需要等待表格数据更新完毕后更新滚动条
            const removeAjaxCallback = this.data.onAjaxComplete(() => {
                removeAjaxCallback();
                this.contentScrollbar.scrollToTop();
            })
        })
    }

    public resize() {
        this._fixHeaderTop();
        this._handleScrollBar();
        this._setVerticalScrollbarOffset();
        this._updateFillUpBlankRow();
        this._updateAutoPageSizing();
        this._updateFrozenColumns();
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
        if (this._currentPageChangeSubscription) {
            this._currentPageChangeSubscription.unsubscribe();
            this._currentPageChangeSubscription = null;
        }
        this._themeChangeSubscription?.unsubscribe();
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

    /**
     * 手动重置sort按钮样式
     */
    public resetSort() {
        this._headerComponents.forEach(comp => comp.updateSortOrderClass(comp.defaultSortOrder));
    }

    /**
     * _additionalData默认是保存在组件内的，即使刷新数据了也不会重置，有些场景是需要在刷新数据后重置_additionalData的
     */
    public resetAdditionalData() {
        this._additionalData.reset();
    }

    private _removeAdditionalDataChangeSubscription: Subscription;

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

        if (this._removeAdditionalDataChangeSubscription) {
            this._removeAdditionalDataChangeSubscription.unsubscribe();
            this._removeAdditionalDataChangeSubscription = null;
        }

        this._removeAdditionalDataChangeSubscription = this._additionalData.change.subscribe(() => {
            this.additionalDataChange.emit(this.additionalData)
        })
    }

    @ViewChild('contentScrollbar', {read: PerfectScrollbarDirective})
    public contentScrollbar: PerfectScrollbarDirective;

    @ViewChild('headerScrollbar', { read: ElementRef })
    private _headerScrollbar: ElementRef;

    /**
     * @internal
     */
    public _$noDataSrc = CommonUtils.noDataImageSrc;

    /**
     * 根据内容计算自适应列宽
     *
     */
    private _calculateContentWidth() {
        const host = this._elementRef.nativeElement;
        //处理没有数据的情况
        const tHeadColGroup = host.querySelectorAll('.jigsaw-table-header > colgroup col');
        const tBodyColGroup = host.querySelectorAll('.jigsaw-table-body > colgroup col');
        const tHeadTds = host.querySelectorAll('.jigsaw-table-header > thead td');
        const tBodyTds = host.querySelectorAll('.jigsaw-table-body > thead td');
        if (!tHeadColGroup || !tHeadColGroup.length) {
            return;
        }

        host.querySelectorAll('table').forEach(table => {
            this._renderer.setStyle(table, 'table-layout', 'auto');
        });

        // 设置表头随内容撑开
        this._renderer.setStyle(host.querySelector('.jigsaw-table-header'), 'width', 'auto');
        this._renderer.setStyle(host.querySelector('.jigsaw-table-header'), 'white-space', 'nowrap');
        this._renderer.setStyle(host.querySelector('.jigsaw-table-body'), 'width', 'auto');

        const widthStorage = [];

        // 清空col的width
        tHeadColGroup.forEach(col => col.setAttribute('width', ''));
        tBodyColGroup.forEach(col => col.setAttribute('width', ''));
        if (this._$isFFBrowser) {
            tHeadTds.forEach(col => col.setAttribute('width', ''));
            tBodyTds.forEach(col => col.setAttribute('width', ''));
        }

        host.querySelectorAll('.jigsaw-table-body > tbody tr:first-child td')
            .forEach(td => widthStorage.push(this._getElementWidth(td)));

        if (widthStorage.length) {
            host.querySelectorAll('.jigsaw-table-header > thead tr:first-child td')
                .forEach((td, index) => {
                    if (this._getElementWidth(td) > widthStorage[index]) {
                        widthStorage[index] = this._getElementWidth(td);
                    }
                });
        } else {
            host.querySelectorAll('.jigsaw-table-header > thead tr:first-child td')
                .forEach(td => {
                    widthStorage.push(this._getElementWidth(td));
                });
        }

        this._$headerSettings.forEach((headerSetting, index) => {
            const colWidth = headerSetting.width == 'byContent' || this.contentWidth == '_inner_auto_' ?
                this._getAcceptableWidth(widthStorage[index], headerSetting.maxWidth) : !!headerSetting.width ? headerSetting.width : '0*';
            tHeadColGroup[index] && tHeadColGroup[index].setAttribute('width', colWidth);
            tBodyColGroup[index] && tBodyColGroup[index].setAttribute('width', colWidth);
            if (this._$isFFBrowser) {
                tHeadTds[index] && tHeadTds[index].setAttribute('width', colWidth);
                tBodyTds[index] && tBodyTds[index].setAttribute('width', colWidth);
            }
        });

        // 还原
        host.querySelectorAll('table').forEach(table => {
            this._renderer.setStyle(table, 'table-layout', 'fixed');
        });
        const width = this.contentWidth == 'auto' || this.contentWidth == '_inner_auto_' ? '100%' : this.contentWidth;
        this._renderer.setStyle(host.querySelector('.jigsaw-table-header'), 'width', width);
        this._renderer.setStyle(host.querySelector('.jigsaw-table-header'), 'white-space', 'normal');
        this._renderer.setStyle(host.querySelector('.jigsaw-table-body'), 'width', width);
    }

    private _getElementWidth(el: Element): number {
        // 使用getComputedStyle要比offsetWidth准确
        return parseFloat(window.getComputedStyle(el).width)
    }

    private _getAcceptableWidth(width: number, maxWidth: number): number {
        return CommonUtils.isUndefined(maxWidth) ? width : Math.min(width, maxWidth);
    }

    /**
     * 处理滚动条
     */
    private _handleScrollBar() {
        this._calculateContentWidth();
        this._calibrateTable();
        this._updateScrollbar();
    }

    /**
     * 校正表头表体的宽度
     */
    private _calibrateTable() {
        const host = this._elementRef.nativeElement;
        const tableHeader = host.querySelector('table.jigsaw-table-header');
        const tableBody = host.querySelector('table.jigsaw-table-body');
        const tableRange = host.querySelector('.jigsaw-table-range');

        if (this._$cellSettings.length || this._$headerSettings.length) {
            if (host.offsetWidth > tableBody.offsetWidth) {
                this._renderer.setStyle(tableHeader, 'width', host.offsetWidth + 'px');
                this._renderer.setStyle(tableBody, 'width', host.offsetWidth + 'px');
            }
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
     *
     */
    private _setVerticalScrollbarOffset() {
        if (this._yScrollbarElement) {
            this._renderer.setStyle(this._yScrollbarElement, 'left',
                this._elementRef.nativeElement.offsetWidth + this.contentScrollbar.geometry().x - 15 + 'px');
        }
    }

    /**
     * 设置表头滚动
     *
     */
    private _setHeaderScrollLeft() {
        if (!this._headerScrollbar || !this.contentScrollbar) {
            return;
        }

        this._headerScrollbar.nativeElement.scrollLeft = this.contentScrollbar.elementRef.nativeElement.scrollLeft;
    }

    /**
     * 找到纵向滚动条，并设置初始位置
     *
     */
    private _initVerticalScroll() {
        this.runMicrotask(() => {
            // selector使用>选择直接子元素，避免选择到其他滚动条
            const yScrollbar = this._elementRef.nativeElement.querySelector('.jigsaw-table-body-range > .ps__rail-y');
            if (yScrollbar) {
                this._renderer.setStyle(yScrollbar, 'left',
                    this._elementRef.nativeElement.offsetWidth - 15 + 'px');
                this._yScrollbarElement = yScrollbar;
            } else {
                this._initVerticalScroll();
            }
        });
    }

    /**
     * 当内容数据变化时，刷新一下滚动条
     *
     */
    private _updateScrollbar() {
        if (this.contentScrollbar) {
            this.contentScrollbar.update();
        }
    }

    private _removeHorizontalScrollListener: Function;

    /**
     * 监听横向滚动事件，更新纵向滚动条的位置，更新表头滚动
     *
     */
    private _listenHorizontalScroll() {
        if (!this.contentScrollbar) {
            return;
        }
        this._zone.runOutsideAngular(() => {
            const el = this.contentScrollbar.elementRef.nativeElement;
            this._removeHorizontalScrollListener = this._renderer.listen(
                el, 'ps-scroll-x', () => {
                    this._setVerticalScrollbarOffset();
                    this._setHeaderScrollLeft();
                });
        });
    }

    /**
     * 展开行
     */
    public expand(rowIndex: number, rawHtml: string, rawHtmlContext?: object, options?: TableRowExpandOptions): void {
        const rowElement = this._rowElementRefs.toArray()[rowIndex]?.nativeElement;
        if (!rowElement) {
            return;
        }

        const action = options?.action || 'toggle';
        const expanded = rowElement.nextSibling.nodeName === 'TR' && rowElement.nextSibling.classList.contains('jigsaw-table-row-expansion');
        if (!expanded && action == 'hide') {
            // 该行还没打开，恰好此时人家要求关掉，那啥事不用做
            return;
        }
        if (expanded && action == 'hide') {
            // 该行已经打开，人家要求关掉
            this._hideExpansion(rowElement);
            return;
        }
        if (expanded && action == 'show') {
            // 已经打开了，但此时人家要求再打开，需要更新一下内容
            const rowInfo = this._allExpandedRows.find(i => i?.element === rowElement.nextSibling);
            rowInfo.remainOpen = options?.remainOpenAfterDataChanges;
            rowInfo.element.children[0].innerHTML = TrustedHtmlHelper.updateHtml(
                CommonUtils.isUndefined(rawHtml) ? "" : rawHtml, rawHtmlContext, []);
            return;
        }
        if (!expanded && action == 'show') {
            // 该行还没打开，人家要求打开
            this._showExpansion(rowElement, rawHtml, rawHtmlContext, options?.remainOpenAfterDataChanges, rowIndex);
            return;
        }
        if (expanded && action == 'toggle') {
            this._hideExpansion(rowElement);
            return;
        }
        if (!expanded && action == 'toggle') {
            this._showExpansion(rowElement, rawHtml, rawHtmlContext, options?.remainOpenAfterDataChanges, rowIndex);
            return;
        }
        throw new Error('internal error, should not run here!');
    }

    private _allExpandedRows: { element: HTMLTableRowElement, remainOpen: boolean, rowIndex: number, currentPage: number }[] = [];

    private _showExpansion(rowElement: HTMLTableRowElement, rawHtml: string, context: object, remainOpen: boolean, rowIndex: number): void {
        const tr = document.createElement('tr');
        const trustedEle = document.createElement('td');
        const headerEle = this._headerComponents.toArray();
        trustedEle.colSpan = headerEle.length;
        tr.classList.add('jigsaw-table-row-expansion');
        tr.insertBefore(trustedEle, tr.lastElementChild);

        const trustedHtml = CommonUtils.isUndefined(rawHtml) ? "" : rawHtml;
        trustedEle.innerHTML = TrustedHtmlHelper.updateHtml(trustedHtml, context, []);
        rowElement.parentNode.insertBefore(tr, rowElement.nextSibling);
        const data: IPageable = <any>this.data;
        const currentPage = data?.pagingInfo instanceof PagingInfo ? data.pagingInfo.currentPage : undefined;
        this._allExpandedRows.push({ element: tr, rowIndex, remainOpen, currentPage });
    }

    private _hideExpansion(rowElement: HTMLTableRowElement): void {
        const index = this._allExpandedRows.findIndex(i => i?.element === rowElement.nextSibling);
        this._allExpandedRows.splice(index, 1);
        rowElement.nextSibling.remove();
    }

    private _clearExpansion() {
        const data: IPageable = <any>this.data;
        const currentPage = data?.pagingInfo instanceof PagingInfo ? data.pagingInfo.currentPage : undefined;

        this._allExpandedRows = this._allExpandedRows.filter(rowInfo => {
            if (rowInfo.remainOpen && rowInfo.currentPage === currentPage && rowInfo.rowIndex < this._data.data.length) {
                return true
            } else {
                rowInfo.element.remove();
                return false;
            }
        })
    }

    public download(name: string = 'table-data.csv') {
        if (!this.data || !this.data.data) {
            console.warn('Download table data failed!')
            return;
        }

        const data = this.data instanceof LocalPageableTableData ? this.data.originalData : this.data.data;
        const csvContent = `data:text/csv;charset=utf-8, ${this.data.header.join(",")} \n`
            + data.map(e => e.map(i => {
                const escapedValue = String(i)
                    .replace(/(")/g, '$1$1')
                    .replace(/#/g, '%23');
                return `"${escapedValue}"`;
            }).join(",")).join("\n");

        const link = document.createElement("a");
        link.setAttribute("href", csvContent);
        link.setAttribute("download", name);
        link.click();
    }

    ngAfterViewInit() {
        this._selectRow(this.selectedRow, true);

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
        // 自动分页
        this._updateAutoPageSizing();
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
        if (this._removeAdditionalDataChangeSubscription) {
            this._removeAdditionalDataChangeSubscription.unsubscribe();
            this._removeAdditionalDataChangeSubscription = null;
        }
        if (this._themeChangeSubscription) {
            this._themeChangeSubscription.unsubscribe();
            this._themeChangeSubscription = null;
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
    declarations: [JigsawTable, JigsawTableCellInternalComponent, JigsawTableHeaderInternalComponent, JigsawTableHeaderFilterBox],
    imports: [CommonModule, JigsawCommonModule, JigsawTableRendererModule, PerfectScrollbarModule, JigsawTrustedHtmlModule,
        TranslateModule.forChild(), JigsawFloatModule, JigsawButtonModule, JigsawListModule, JigsawCheckBoxModule, JigsawSearchInputModule,
        JigsawLoadingModule],
    exports: [JigsawTable, JigsawTableCellInternalComponent, JigsawTableHeaderInternalComponent],
})
export class JigsawTableModule {
    constructor() {
        TranslateHelper.initI18n("table", {
            zh: {
                noData: "暂无数据",
                confirm: "确认",
                cancel: "取消"
            },
            en: {
                noData: "NO DATA",
                confirm: "Confirm",
                cancel: "Cancel"
            }
        });
    }
}
