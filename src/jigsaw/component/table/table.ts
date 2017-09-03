import {
    Component, EventEmitter, Input, NgModule, OnDestroy, OnInit, Output, ViewChildren, ElementRef, QueryList,
    Renderer2, AfterViewInit
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent, JigsawCommonModule} from "../common";
import {JigsawTableCellInternalComponent, JigsawTableHeaderInternalComponent} from "./table-inner.components";
import {TableData} from "../../core/data/table-data";

import {
    AdditionalColumnDefine,
    ColumnDefine, SortChangeEvent,
    TableCellSetting,
    TableColumnTargetFinder,
    TableDataChangeEvent,
    TableHeadSetting
} from "./table-typings";
import {CallbackRemoval, CommonUtils} from "../../core/utils/common-utils";
import {SortAs, SortOrder} from "../../core/data/component-data";
import {DefaultCellRenderer, JigsawTableRendererModule, TableCellTextEditorRenderer} from "./table-renderer";
import {PopupService} from "../../service/popup.service";
import {JigsawScrollBarModule} from "../../directive/scrollbar/scrollbar";
import {AffixUtils} from "../../core/utils/internal-utils";

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
    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
        super()
    }

    @Output()
    public sort = new EventEmitter<SortChangeEvent>();

    //todo fix this
    @Input()
    public lineEllipsis: boolean = false;

    //todo fix this
    @Input()
    public hideHead: boolean = false;

    private _select: number;

    @Input()
    public get select(): number {
        return this._select;
    }

    public set select(value: number) {
        this._select = value;
        if (this.initialized) {
            this._$selectRow(value);
        }
    }

    @Output()
    public selectChange: EventEmitter<number> = new EventEmitter<number>();

    /**
     * @internal
     */
    public _$headerSettings: TableHeadSetting[] = [];

    private _updateHeaderSettings(): void {
        let currentFields = [];
        let fieldIndex = 0;
        let settingsBackup: TableHeadSetting[] = this._$headerSettings.concat();
        this._$headerSettings.splice(0, this._$headerSettings.length);
        this.data.field.forEach((field, index) => {
            let matchedColumnDef = this.columnDefines.find(
                colDef => (<TableColumnTargetFinder>colDef.target)(field, index));
            if (matchedColumnDef && matchedColumnDef.visible === false) {
                return;
            }

            let originIndex = this._lastFields.indexOf(field);
            let settings = originIndex == -1 || !settingsBackup[originIndex] || !matchedColumnDef ?
                this._createHeaderSettings(matchedColumnDef, fieldIndex++) : settingsBackup[originIndex];
            if (settings.cellData === null) {
                settings.cellData = this.data.header[index];
            }
            this._$headerSettings.push(settings);
            currentFields.push(field);
        });
        // update `_lastFields` here, and we do not need to update it in `_updateCellSettings` again
        this._lastFields = currentFields;
    }

    /**
     * @internal
     */
    public _$cellSettings: TableCellSetting[][] = [];

    private _updateCellSettings(): void {
        let settingsBackup: TableCellSetting[][] = [];
        // backup and clear origin settings, we have to use the origin row array ref
        // to avoid ngFor from rerendering the dom
        this._$cellSettings.forEach(row => {
            settingsBackup.push(row.concat());
            row.splice(0, row.length);
        });
        // remove extra lines if necessary
        this._$cellSettings.splice(this.data.data.length, this._$cellSettings.length);

        let fieldIndex = 0;
        this.data.field.forEach((field, index) => {
            let matchedColumnDef = this.columnDefines.find(
                colDef => (<TableColumnTargetFinder>colDef.target)(field, index));
            if (matchedColumnDef && matchedColumnDef.visible === false) {
                return;
            }

            let originIndex = this._lastFields.indexOf(field);
            let sTemplate: TableCellSetting = this._createCellSettings(matchedColumnDef, fieldIndex);
            let groupSetting: TableCellSetting;
            let settings: TableCellSetting;
            for (let i = 0, len = this.data.data.length; i < len; i++) {
                if (originIndex == -1 || !settingsBackup[i] || !settingsBackup[i][originIndex]) {
                    settings = <TableCellSetting>CommonUtils.shallowCopy(sTemplate);
                } else {
                    settings = settingsBackup[i][originIndex];
                    settings.rowSpan = 1;
                }
                if (!this._$cellSettings[i]) {
                    this._$cellSettings.push([]);
                }
                this._$cellSettings[i][fieldIndex] = settings;

                if (settings.editable) {
                    settings.renderer = settings.renderer ? settings.renderer : DefaultCellRenderer;
                    settings.editorRenderer = settings.editorRenderer ? settings.editorRenderer : TableCellTextEditorRenderer;
                }

                settings.cellData = this.data.data[i][index];
                //todo change TableData cell type to any
                if (<any>settings.cellData instanceof Function) {
                    // it is a `TableCellDataGenerator`, we need to use it to generate a value
                    const generator: Function = <any>settings.cellData;
                    settings.cellData = generator(this.data, i, fieldIndex);
                }

                if (matchedColumnDef && matchedColumnDef.group) {
                    if (groupSetting && groupSetting.cellData === settings.cellData) {
                        groupSetting.rowSpan++;
                        settings.rowSpan = 0;
                    } else {
                        groupSetting = settings;
                    }
                }
            }
            fieldIndex++;
        });
    }

    private _createCellSettings(columnDefine: ColumnDefine, fieldIndex: number): TableCellSetting {
        let settings: TableCellSetting = {
            cellData: '',
            width: undefined,
            visible: true,
            renderer: null,
            clazz: '',
            editable: false,
            editorRenderer: null,
            group: false,
            field: fieldIndex,
            rowSpan: 1
        };
        settings.width = columnDefine && columnDefine.width;
        settings.group = columnDefine && columnDefine.group;
        let cellDef = columnDefine && columnDefine.cell;
        if (cellDef) {
            settings.renderer = cellDef.renderer;
            settings.clazz = cellDef.clazz;
            settings.editable = cellDef.editable;
            settings.editorRenderer = cellDef.editorRenderer;
        }
        return settings;
    }

    private _createHeaderSettings(columnDefine: ColumnDefine, fieldIndex: number): TableHeadSetting {
        let settings: TableHeadSetting = {
            cellData: null,
            width: null,
            visible: true,
            renderer: null,
            clazz: '',
            sortable: false,
            sortAs: SortAs.string,
            defaultSortOrder: SortOrder.default,
            field: fieldIndex
        };
        settings.width = columnDefine && columnDefine.width;
        let headerDef = columnDefine && columnDefine.header;
        if (headerDef) {
            settings.cellData = headerDef.text === undefined || headerDef.text === null ? settings.cellData : headerDef.text;
            settings.renderer = headerDef.renderer;
            settings.clazz = headerDef.clazz;
            settings.sortable = headerDef.sortable;
            settings.sortAs = headerDef.sortAs === undefined || headerDef.sortAs === null ? settings.sortAs : headerDef.sortAs;
            settings.defaultSortOrder = headerDef.sortAs === undefined || headerDef.sortAs === null ?
                settings.defaultSortOrder : headerDef.defaultSortOrder;
        }
        return settings;
    }

    private _mixInAdditionalColumns(): void {
        if (!this._additionalColumnDefines) {
            return;
        }
        for (let i = this._additionalColumnDefines.length - 1; i >= 0; i--) {
            const acd = this._additionalColumnDefines[i];
            if (this.data.field.indexOf(acd.field) != -1) {
                // existed
                continue;
            }

            const cd: ColumnDefine = {
                target: acd.field,
                header: acd.header,
                group: acd.group,
                cell: acd.cell,
                width: acd.width,
                visible: acd.visible
            };
            const pos = acd.pos == undefined || acd.pos == null ? this._data.field.length : acd.pos;
            this.columnDefines.splice(pos, 0, cd);
            // the acd.cell.data could be a `TableCellDataGenerator`
            this.data.insertColumn(pos, acd.cell.data, acd.field, acd.header.text ? acd.header.text : acd.field);
        }
    }

    private _normalizeColumnTarget() {
        // normalize the target to `TableColumnTargetFinder`
        this.columnDefines.forEach((colDef, index) => {
            const cd = <ColumnDefine>CommonUtils.shallowCopy(colDef);
            this.columnDefines[index] = cd;
            if (!cd.hasOwnProperty('target')) {
                console.error('invalid column target, need a "target" property!');
                return;
            }
            let targets;
            if (typeof cd.target == 'number' || typeof cd.target == 'string') {
                targets = [cd.target];
            } else if (cd.target instanceof Array) {
                targets = cd.target
            }
            if (targets != undefined) {
                cd.target = (field, index) => !!targets.find((f, i) => (f == field || i == index));
            }
        });
    }

    private _update(): void {
        if (!this.initialized || !this._data) {
            return;
        }
        if (!this._data.field || this._data.field.length == 0) {
            console.error('invalid table data, need a "field" property.');
            return;
        }
        this._updateHeaderSettings();
        this._updateCellSettings();
        this._setCellLineEllipsis();
        this._sortColumnByDefault();
    }

    private _removeRefreshCallback: CallbackRemoval;
    private _lastFields: string[] = [];
    private _data: TableData;

    @Input()
    public get data(): TableData {
        return this._data;
    }

    public set data(value: TableData) {
        if (value == this._data || !value) {
            return;
        }
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
        }
        this._data = value;

        this._removeRefreshCallback = value.onRefresh(this._update, this);
        this._checkAdditionalColumnFields();
        this._mixInAdditionalColumns();
        this._normalizeColumnTarget();
        this._update();
    }

    @Output()
    public dataChange = new EventEmitter<TableDataChangeEvent>();

    private _columnDefines: ColumnDefine[] = [];

    @Input()
    public get columnDefines(): ColumnDefine[] {
        return this._columnDefines;
    }

    public set columnDefines(value: ColumnDefine[]) {
        if (!value || value == this._columnDefines) {
            return;
        }
        if (!this._columnDefines) {
            console.warn('do not support updating the columnDefines yet! ' +
                'you can give the table every possible column defines when you init the table.');
            return;
        }
        this._columnDefines = value;
    }

    private _additionalColumnDefines: AdditionalColumnDefine[] = [];

    @Input()
    public get additionalColumnDefines(): AdditionalColumnDefine[] {
        return this._additionalColumnDefines;
    }

    public set additionalColumnDefines(value: AdditionalColumnDefine[]) {
        if (!value || value == this._additionalColumnDefines) {
            return;
        }
        if (!this._additionalColumnDefines) {
            console.warn('do not support updating the additionalColumnDefine yet! ' +
                'you can give the table every possible column defines when you init the table.');
            return;
        }
        this._additionalColumnDefines = value;
        this._checkAdditionalColumnFields();
    }

    private _checkAdditionalColumnFields(): void {
        if (!this.data || !this.additionalColumnDefines) {
            return;
        }
        this.additionalColumnDefines.forEach((acd, index) => {
            if (this.data.field.indexOf(acd.field) != -1) {
                console.warn('conflict field in additional column, using default, origin field=' + acd.field);
                acd.field = '';
            }
            //todo 如果应用原来给的field就是 additional-field-n，那还是有问题。
            acd.field = acd.field ? acd.field : `additional-field-${index}`;
        });
    }

    @Output()
    public doubleClick: EventEmitter<number> = new EventEmitter<number>();

    public _$handleRowDoubleClick(rowIndex: number) {
        this.doubleClick.emit(rowIndex);
    }

    @ViewChildren('tableRow', {read: ElementRef})
    private _rowElementRefs: QueryList<ElementRef>;

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

    /**
     * 一旦数据有更新，表格将自动对已经设置了排序的行做自动排序处理。在某些情况下会很方便，但是在表格数据量大的时候，可能会有性能问题，
     * 表格数据量大的时候，最好关闭这个选项，由应用自行对`data`属性做排序。也可以不自动排序，由用户自行点击列头触发行排序
     *
     * @type {boolean}
     */
    @Input() public autoSortOnChange: boolean = false;

    private _sortedColumn: number = -1;
    private _sortedOrder: SortOrder;

    private _sortColumnByDefault() {
        if (this._sortedColumn == -1) {
            // the user has sorted some column manually, we do not sort by default.
            return;
        }
        let headSetting = this._$headerSettings.find(headSetting => headSetting.sortable &&
            (headSetting.defaultSortOrder == SortOrder.asc || headSetting.defaultSortOrder == SortOrder.des)
        );
        if (!headSetting) {
            // no default sort column given by the user.
            return;
        }
        this.data.sort(headSetting.sortAs, headSetting.defaultSortOrder, headSetting.field);
    }

    @ViewChildren('floatingHeader', {read: ElementRef})
    private _floatingHeaders: QueryList<ElementRef>;
    @ViewChildren('realHeader', {read: ElementRef})
    private _realHeaders: QueryList<ElementRef>;

    private _setFloatingHeadWidth(): void {
        const ne = this._elementRef.nativeElement;
        const hostWidth = ne.offsetWidth + 'px';

        //消除table非必要的横向滚动条(可能会有的小数点像素的四舍五入产生的滚动条)，这里手动让.jigsaw-table和.jigsaw-table-box宽度相同
        this._renderer.setStyle(ne.querySelector('.jigsaw-table'), 'width', hostWidth);
        this._renderer.setStyle(ne.querySelector('.jigsaw-table-box'), 'width', hostWidth);

        //获取表格的实际宽度
        const tableWidth = ne.querySelector('.jigsaw-table').offsetWidth + 'px';

        //设置浮动表头的宽度
        this._renderer.setStyle(ne.querySelector('.jigsaw-table-fixed-head'), 'width', tableWidth);

        const realHeaderArray = this._realHeaders.toArray();
        //设置浮动表头单元格宽度
        this._floatingHeaders.forEach((floatingHeader, index) => {
            this._renderer.setStyle(floatingHeader.nativeElement, 'width',
                realHeaderArray[index].nativeElement.offsetWidth + 'px');
        });
    }

    /**
     * 设置单元格内容的宽度，如果内容超过宽度，并且设置了行省略，则使用'...'+tooltip的形式显示
     * @private
     */
    private _setCellLineEllipsis() {
        //不设置省略功能，就不需要设置单元格宽度
        if (!this.lineEllipsis || !this._rowElementRefs) return;

        const hostWidth = this._elementRef.nativeElement.offsetWidth;
        this._rowElementRefs.forEach((row, rowIndex) => {
            const elements: NodeListOf<Element> = row.nativeElement.querySelectorAll('.jigsaw-table-cell-content');
            for (let colIndex = 0; colIndex < elements.length; ++colIndex) {
                const element: Element = elements[colIndex];
                const cellSetting: TableCellSetting = this._$cellSettings[rowIndex][colIndex];
                if (cellSetting.renderer && cellSetting.renderer != DefaultCellRenderer) {
                    //没有渲染器或者用DefaultCellRenderer的单元格才能用省略
                    continue;
                }
                if (!cellSetting.width) {
                    continue;
                }
                let width = CommonUtils.getCssValue(cellSetting.width);
                if (width.match(/^\s*\d+%\s*$/)) {
                    width = hostWidth * Number(width.replace(/%/, '')) / 100 + '';
                } else {
                    width = width.replace(/px/, '');
                }
                this._renderer.setStyle(element, 'width', width + 'px');

                const cellText: HTMLElement = <HTMLElement>element.querySelector('span.jigsaw-table-cell-text');
                if (cellText && cellText.offsetWidth > +width) {
                    cellText.setAttribute('title', cellSetting.cellData.toString());
                }
            }
        })
    }

    private _removeWindowScrollListener: Function;
    private _removeWindowResizeListener: Function;

    private _addWindowListener() {
        this._removeWindowListener();

        // this._removeWindowLoadListener = this._renderer.listen('window', 'load', () => {
        //     this._setCellLineEllipsis();
        //     this._setFixedHeadWidth();
        // });
        this._removeWindowResizeListener = this._renderer.listen('window', 'resize', () => {
            this._setCellLineEllipsis();
            this._setFloatingHeadWidth();
            this._floatHead();
            // this._scrollBar.scrollTo([null, 'left']);
            // this._renderer.setStyle(this._floatingHeadElement, 'left', 0);
        });
        this._removeWindowScrollListener = this._renderer.listen('window', 'scroll', () => {
            this._floatHead();
        });
    }

    private _floatingHeadElement: HTMLElement;

    private _floatHead() {
        const maxTop = this._elementRef.nativeElement.offsetHeight - this._floatingHeadElement.offsetHeight;
        let tableDocumentTop = AffixUtils.offset(this._elementRef.nativeElement).top;
        let scrollTop = AffixUtils.getScrollTop();
        let top = scrollTop - tableDocumentTop;
        if (top > 0 && top < maxTop) {
            this._renderer.setStyle(this._floatingHeadElement, 'top', top + 'px');
        } else if (top <= 0) {
            this._renderer.setStyle(this._floatingHeadElement, 'top', '0px');
        } else if (top >= maxTop) {
            this._renderer.setStyle(this._floatingHeadElement, 'top', maxTop);
        }
    }

    private _removeWindowListener() {
        // if (this._removeWindowLoadListener) {
        //     this._removeWindowLoadListener();
        //     this._removeWindowLoadListener = null;
        // }
        if (this._removeWindowScrollListener) {
            this._removeWindowScrollListener();
            this._removeWindowScrollListener = null;
        }
        if (this._removeWindowResizeListener) {
            this._removeWindowResizeListener();
            this._removeWindowResizeListener = null;
        }
    }

    ngAfterViewInit() {
        this._$selectRow(this.select, true);
        this._setCellLineEllipsis();
        this._setFloatingHeadWidth();
    }

    ngOnInit() {
        super.ngOnInit();

        this._mixInAdditionalColumns();
        this._normalizeColumnTarget();
        this._update();

        this._addWindowListener();

        this._renderer.setStyle(this._elementRef.nativeElement.querySelector('.jigsaw-table-box'),
            'max-height', this._maxHeight);
        this._floatingHeadElement = this._elementRef.nativeElement.querySelector(".jigsaw-table-fixed-head");

        if (this.lineEllipsis) {
            this._renderer.addClass(this._elementRef.nativeElement.querySelector('table.jigsaw-table tbody'),
                'jigsaw-table-line-ellipsis');
        }
    }

    ngOnDestroy() {
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback();
            this._removeRefreshCallback = null;
        }
        this._removeWindowListener();

        this._data = null;
        this._lastFields = null;
        this._columnDefines = null;
        this._additionalColumnDefines = null;
        this._$cellSettings = null;
        this._$headerSettings = null;
        this._floatingHeadElement = null;
        this._floatingHeaders = null;
        this._realHeaders = null;
        this._rowElementRefs = null;
    }

    /**
     * @internal
     */
    public _$scrollBarOptions: any = {
        snapAmount: 30,
        mouseWheel: {enable: true, scrollAmount: 90},
    };
}

@NgModule({
    declarations: [JigsawTable, JigsawTableCellInternalComponent, JigsawTableHeaderInternalComponent],
    imports: [CommonModule, JigsawCommonModule, JigsawTableRendererModule, JigsawScrollBarModule],
    exports: [JigsawTable, JigsawTableCellInternalComponent, JigsawTableHeaderInternalComponent],
    entryComponents: [TableCellTextEditorRenderer, DefaultCellRenderer]
})
export class JigsawTableModule {
}
