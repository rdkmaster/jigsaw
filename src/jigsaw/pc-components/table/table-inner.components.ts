import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    TemplateRef,
    Type,
    ViewChild,
    Directive,
    NgZone
} from "@angular/core";
import {AbstractJigsawViewBase, JigsawRendererHost} from "../../common/common";
import {_getColumnIndex, AdditionalTableData, SortChangeEvent, TableDataChangeEvent} from "./table-typings";
import {DefaultCellRenderer, TableCellRendererBase} from "./table-renderer";
import {LocalPageableTableData, TableData} from "../../common/core/data/table-data";
import {SortAs, SortOrder} from "../../common/core/data/component-data";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';
import {CheckBoxStatus} from '../checkbox/typings';
import {JigsawFloat} from "../../common/directive/float/float";
import {ArrayCollection} from '../../common/core/data/array-collection';
import {isObservable} from "rxjs";
import {DataFilterInfo} from "../../common/core/data/unified-paging/paging";

@Directive()
export class TableInternalCellBase extends AbstractJigsawViewBase implements AfterViewInit, OnInit {
    constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                protected changeDetector: ChangeDetectorRef, protected _zone: NgZone) {
        super(_zone);
    }

    @ViewChild(JigsawRendererHost)
    protected rendererHost: JigsawRendererHost;
    protected targetData: TableData | AdditionalTableData;
    protected rendererRef: ComponentRef<TableCellRendererBase> | EmbeddedViewRef<any>;

    private _cellData;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get cellData() {
        return this._cellData;
    }

    public set cellData(value) {
        this._cellData = value;
        this._updateDataInRenderer('cellData', value);
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public row: number;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public field: string;

    protected _customRenderer: Type<TableCellRendererBase> | TemplateRef<any> | 'html';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get renderer(): Type<TableCellRendererBase> | TemplateRef<any> | 'html' {
        return this._customRenderer
    }

    public set renderer(value: Type<TableCellRendererBase> | TemplateRef<any> | 'html') {
        if (this._customRenderer == value || (!value && this._customRenderer == DefaultCellRenderer)) {
            return;
        }
        this._customRenderer = value;
        this.rendererHost?.viewContainerRef.clear();
    }

    private _rendererInitData: any;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get rendererInitData() {
        return this._rendererInitData;
    }

    public set rendererInitData(value: any) {
        this._rendererInitData = value;
        if (this.rendererRef instanceof ComponentRef) {
            this.rendererRef.instance.initData = value;
        }
    }

    @Output()
    public cellDataChange = new EventEmitter<any>();

    private _column: number = -1;

    public get column(): number {
        return this._column;
    }

    private _tableData: TableData;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get tableData(): TableData {
        return this._tableData;
    }

    public set tableData(value: TableData) {
        this._tableData = value;
        this._updateDataInRenderer('tableData', value);
        this._initTargetData();
    }

    private _additionalData: TableData;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get additionalData(): TableData {
        return this._additionalData;
    }

    public set additionalData(value: TableData) {
        this._additionalData = value;
        this._updateDataInRenderer('additionalData', value);
        this._initTargetData();
    }

    private _updateDataInRenderer(prop: string, value: any) {
        if (this.rendererRef instanceof ComponentRef) {
            this.rendererRef.instance[prop] = value;
        } else if (this.rendererRef && this.rendererRef.context && this.rendererRef.context.context) {
            this.rendererRef.context.context[prop] = value;
        }
    }

    private _initTargetData(): void {
        if (!this.tableData || !this.additionalData || !this.initialized) {
            return;
        }
        [this._column, this.targetData] = _getColumnIndex(this._tableData, this._additionalData, this.field);
    }

    /**
     * 宿主表格实例
     * @NoMarkForCheckRequired
     */
    @Input()
    public hostInstance: any;

    /**
     * 宿主表格主题
     * @NoMarkForCheckRequired
     */
    @Input()
    public theme: string;

    /**
     * 渲染器制造工厂
     */
    protected rendererFactory(renderer: Type<TableCellRendererBase> | TemplateRef<any>, initData: any): ComponentRef<TableCellRendererBase> | EmbeddedViewRef<any> {
        if (renderer instanceof TemplateRef) {
            return this.rendererHost.viewContainerRef.createEmbeddedView(renderer, {
                context: {
                    tableData: this.tableData, additionalData: this.additionalData,
                    cellData: this.cellData, row: this.row, field: this.field
                }
            });
        } else {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(renderer);
            const componentRef = this.rendererHost.viewContainerRef.createComponent(componentFactory);
            componentRef.instance.row = this.row;
            componentRef.instance.field = this.field;
            componentRef.instance.tableData = this.tableData;
            componentRef.instance.additionalData = this.additionalData;
            componentRef.instance.cellData = this.cellData;
            componentRef.instance.hostInstance = this.hostInstance;
            componentRef.instance.theme = this.theme;
            componentRef.instance.initData = initData;
            return componentRef;
        }
    }

    /**
     * 插入渲染器
     */
    protected insertRenderer() {
        if (this.renderer != 'html') {
            this.rendererRef = this.rendererFactory(this.renderer, this.rendererInitData);
            this.changeDetector.detectChanges();
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this._initTargetData();
    }

    ngAfterViewInit(): void {
        if (this.renderer != 'html') {
            this.insertRenderer();
        }
    }
}

/**
 * 表头单元格
 *
 * @internal
 */
@Component({
    selector: "jigsaw-table-header",
    template: `
        <div
            class="jigsaw-table-header-cell"
            [ngClass]="{'jigsaw-table-header-cell-sortable': sortable,
                'jigsaw-table-header-cell-filterable': filterable}"
        >
            <ng-template jigsaw-renderer-host></ng-template>
            <div
                *ngIf="renderer == 'html'"
                class="jigsaw-table-header-content"
                [trustedHtml]="headerTrustedHtml"
                [trustedHtmlContext]="headerTrustedHtmlContext"
            ></div>
            <div class="jigsaw-table-header-option-box">
                <div *ngIf="sortable" [ngClass]="_$sortOrderClass">
                    <i
                        (click)="_$sortAsc()"
                        class="iconfont iconfont-e8b5 jigsaw-table-sort-up"
                    ></i>
                    <i
                        (click)="_$sortDes()"
                        class="iconfont iconfont-e8b6 jigsaw-table-sort-down"
                    ></i>
                </div>
                <div
                    *ngIf="filterable"
                    class="jigsaw-table-filter-box"
                    [ngClass]="{'has-header-filter': _$hasHeaderFilter }"
                    jigsaw-float
                    [jigsawFloatTarget]="tableHeaderFilterBox"
                    [jigsawFloatOptions]="{ borderType: 'pointer' }"
                    jigsawFloatPosition="bottomRight"
                    jigsawFloatOpenTrigger="click"
                    jigsawFloatCloseTrigger="click"
                >
                    <i class="iconfont iconfont-e013"></i>
                </div>
            </div>
        </div>
        <ng-template #tableHeaderFilterBox>
            <jigsaw-table-header-filter-box
                [hostInstance]="hostInstance"
                [tableData]="tableData"
                [field]="field"
                [float]="_$jigsawFloat"
            >
            </jigsaw-table-header-filter-box>
        </ng-template>
    `,
})
export class JigsawTableHeaderInternalComponent extends TableInternalCellBase implements OnInit, OnDestroy {
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public sortable: boolean;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public sortAs: SortAs;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public filterable: boolean;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public headerTrustedHtml: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public headerTrustedHtmlContext: any;

    /**
     * @internal
     */
    @ViewChild(JigsawFloat)
    public _$jigsawFloat: JigsawFloat;

    /**
     * @internal
     */
    public _$sortOrderClass: { "jigsaw-table-sort-box": boolean, "jigsaw-table-asc": boolean, "jigsaw-table-des": boolean };

    public updateSortOrderClass(sortOrder: SortOrder): void {
        this._$sortOrderClass = {
            "jigsaw-table-sort-box": true,
            "jigsaw-table-asc": sortOrder == SortOrder.asc,
            "jigsaw-table-des": sortOrder == SortOrder.desc,
        };
    }

    private _defaultSortOrder: SortOrder;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get defaultSortOrder(): SortOrder {
        return this._defaultSortOrder;
    }

    public set defaultSortOrder(newValue: SortOrder) {
        this._defaultSortOrder = newValue;
        this.updateSortOrderClass(newValue);
    }

    @Output()
    public sort: EventEmitter<SortChangeEvent> = new EventEmitter<SortChangeEvent>();

    /**
     * @internal
     */
    public _$sortAsc(): void {
        if (this._$sortOrderClass["jigsaw-table-asc"]) {
            return;
        }
        this._sort(SortOrder.asc);
    }

    /**
     * @internal
     */
    public _$sortDes(): void {
        if (this._$sortOrderClass["jigsaw-table-des"]) {
            return;
        }
        this._sort(SortOrder.desc);
    }

    private _sort(order: SortOrder): void {
        this.updateSortOrderClass(order);
        this.sort.emit({sortAs: this.sortAs, order: order, field: this.field});
        this.tableData.sort(this.sortAs, order, this.field);
    }

    /**
     * @internal
     */
    public _$hasHeaderFilter: boolean = false;

    ngOnInit() {
        super.ngOnInit();
        //设置默认渲染器
        this.renderer = this.renderer ? this.renderer : DefaultCellRenderer;
        this.hostInstance.headerFilterChange.subscribe((headerFilters) => {
            if (headerFilters.length === 0) {
                this._$hasHeaderFilter = false;
            }
            this._$hasHeaderFilter = headerFilters.findIndex(filter => filter.field === this.field) !== -1;
        })
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.rendererRef instanceof ComponentRef) {
            this.rendererRef.instance.cellDataChange.unsubscribe();
        }
    }
}

/**
 * 单元格渲染器
 * @internal
 */
@Component({
    selector: 'jigsaw-table-cell',
    template: '<ng-template jigsaw-renderer-host></ng-template>'
})
export class JigsawTableCellInternalComponent extends TableInternalCellBase implements OnInit, OnDestroy {
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public alwaysShowEditor: boolean = false;

    private _editable: boolean = false;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get editable(): boolean {
        return this._editable;
    }

    public set editable(value: boolean) {
        if (this._editable === value) {
            return;
        }
        this._editable = value;

        if (!this.initialized) {
            return;
        }

        const cursor = this._editable ? 'pointer' : 'default';
        this._renderer.setStyle(this._elementRef.nativeElement.parentElement, 'cursor', cursor);
        if (!this._editable) {
            return;
        }
        if (this.alwaysShowEditor) {
            this._showEditor();
        } else {
            this._setGoEditListener();
        }
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public editorRenderer: Type<TableCellRendererBase>;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public editorRendererInitData: any;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public group: boolean;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public rowSpan: number;

    @Output()
    public edit = new EventEmitter<TableDataChangeEvent>();

    private _editorRendererRef: ComponentRef<TableCellRendererBase> | EmbeddedViewRef<any>;

    private _goEditCallback: () => void;

    constructor(cfr: ComponentFactoryResolver, cd: ChangeDetectorRef,
                private _renderer: Renderer2, private _elementRef: ElementRef, protected _zone: NgZone) {
        super(cfr, cd, _zone);
    }

    private _emitDataChange(cellData: string | number): void {
        let rows = [];
        for (let i = 0; i < this.rowSpan; i++) {
            rows.push(this.row + i);
            // update tableData directly, therefore table.ts need not to do this.
            if (CommonUtils.isDefined(this.targetData.data?.[this.row + i]?.[this.column])) {
                this.targetData.data[this.row + i][this.column] = cellData;
            }
        }

        const change: TableDataChangeEvent = {
            field: this.field,
            row: rows,
            column: this.column,
            cellData: cellData,
            oldCellData: this.cellData
        };
        this.edit.emit(change);

        this.cellData = cellData;
        this.cellDataChange.emit(this.cellData);

        this.runAfterMicrotasks(() => {
            this._zone.run(() => {
                this.targetData.refresh();
            })
        });
    }

    private _rendererSubscribe(renderer: TableCellRendererBase): void {
        renderer.cellDataChange.subscribe(cellData => {
            if (CommonUtils.isUndefined(cellData)) {
                //cellData === '' 认为是合法值
                return;
            }
            if (this.cellData != cellData) {
                this._emitDataChange(cellData);
            }
        });
    }

    private _editorRendererSubscribe(renderer: TableCellRendererBase) {
        renderer.cellDataChange.subscribe(cellData => {
            if (CommonUtils.isUndefined(cellData)) {
                //cellData === '' 认为是合法值
                return;
            }
            if (this.cellData != cellData) {
                this._emitDataChange(cellData);
            }

            if (this.alwaysShowEditor) {
                return;
            }
            this.rendererHost.viewContainerRef.clear();
            this.runMicrotask(() => {
                this.insertRenderer();
                this._setGoEditListener();
            });
        });
    }

    /**
     * 插入渲染器
     */
    protected insertRenderer() {
        super.insertRenderer();
        if (this.rendererRef instanceof ComponentRef) {
            this._rendererSubscribe(this.rendererRef.instance);
        }
    }

    /**
     * 插入编辑渲染器
     */
    protected insertEditorRenderer() {
        this._editorRendererRef = this.rendererFactory(this.editorRenderer, this.editorRendererInitData);

        if (this._editorRendererRef instanceof ComponentRef) {
            this._editorRendererRef.instance.editorMode = this.alwaysShowEditor ? 'always-show' : 'when-activated';
            this._editorRendererSubscribe(this._editorRendererRef.instance);
        }
        if (this._goEditCallback) {
            this._goEditCallback();
        }
        this.changeDetector.detectChanges();
    }

    /**
     * 如果可编辑，单元格绑定点击事件
     */
    private _setGoEditListener() {
        if (this._goEditCallback) {
            this._goEditCallback();
        }
        this._goEditCallback = this._editable ? this._renderer.listen(
            this._elementRef.nativeElement.parentElement, 'click', () => this._showEditor()) : null;
    }

    private _showEditor() {
        this.rendererHost?.viewContainerRef.clear();
        this.insertEditorRenderer();
    }

    ngOnInit() {
        super.ngOnInit();

        //设置默认渲染器
        this.renderer = this.renderer ? this.renderer : DefaultCellRenderer;

        if (!this._editable) {
            return;
        }
        this._renderer.setStyle(this._elementRef.nativeElement.parentElement, 'cursor', 'pointer');
        if (!this.alwaysShowEditor) {
            //绑定点击事件
            this._setGoEditListener();
        }
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.alwaysShowEditor) {
            this._showEditor();
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._editable) {
            this._renderer.setStyle(this._elementRef.nativeElement.parentElement, 'cursor', 'default');
        }

        if (this._goEditCallback) {
            this._goEditCallback();
        }

        if (this.rendererRef instanceof ComponentRef) {
            this.rendererRef.instance.cellDataChange.unsubscribe();
        }

        if (this._editorRendererRef instanceof ComponentRef) {
            this._editorRendererRef.instance.cellDataChange.unsubscribe();
        }
    }
}


/**
 * 表头过滤弹框
 *
 * @internal
 */
@Component({
    selector: 'jigsaw-table-header-filter-box',
    template: `
        <div class="jigsaw-table-header-filter-host">
            <div class="jigsaw-table-header-filter-search">
                <j-checkbox [(checked)]="_$selectAllChecked" (checkedChange)="_$selectAll()"></j-checkbox>
                <jigsaw-search-input width="250" [searchDebounce]="1000" (search)="_$handleSearching($event)"
                    floatPosition="topLeft" [historyStorageKey]="'jigsaw.tableHeaderFilter.' + field">
                </jigsaw-search-input>
            </div>
            <j-list class="jigsaw-table-header-filter-list" [perfectScrollbar]="{ wheelSpeed: 0.5, minScrollbarLength: 20 }"
                    [multipleSelect]="true" [(selectedItems)]="_$selectedItems" (selectedItemsChange)="_$handleSelectChange()">
                <j-list-option #listItem *ngFor="let item of _$filteredData" [value]="item">
                    <div class="item-box">
                        <j-checkbox #checkbox [(checked)]="listItem.selected" mode="minimalist" style="margin-right: 8px;">
                        </j-checkbox>
                        <span>{{item}}</span>
                    </div>
                </j-list-option>
            </j-list>
            <div *ngIf="_$filteredData?.length === 0" class="jigsaw-table-header-filter-nodata">{{'table.noData' | translate}}</div>

            <div *ngIf="_$dataStatus == 'loading'" class="jigsaw-table-header-filter-loading">
                <jigsaw-circle-loading [size]="'large'"></jigsaw-circle-loading>
            </div>

            <div class="jigsaw-table-header-filter-btn">
                <jigsaw-button preSize="small" colorType="primary" style="margin-right: 8px;" (click)="filterConfirm(field)">
                    {{'table.confirm' | translate}}
                </jigsaw-button>
                <jigsaw-button preSize="small" (click)="filterCancel()">{{'table.cancel' | translate}}</jigsaw-button>
            </div>
        </div>`
})
export class JigsawTableHeaderFilterBox extends AbstractJigsawViewBase implements OnInit {
    constructor(protected _changeDetector: ChangeDetectorRef, protected _zone?: NgZone) {
        super(_zone);
    }

    private _data: string[];

    /**
     * @internal
     */
    public _$dataStatus: 'unknown' | 'loading' | 'resolved' = 'unknown';

    /**
     * @internal
     */
    public _$selectedItems: string[];

    /**
     * @internal
     */
    public _$filteredData: string[];

    /**
     * @internal
     */
    public _$selectAllChecked: CheckBoxStatus;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public tableData: TableData;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public field: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public float: JigsawFloat;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public hostInstance: any;

    @ViewChild(PerfectScrollbarDirective)
    private _listScrollbar: PerfectScrollbarDirective;

    /**
     * @internal
     */
    public _$handleSearching(filterKey?: string) {
        this._filterData(filterKey);
        this._checkSelectAll();
        this.runAfterMicrotasks(() => {
            this.float.reposition();
        });
    }

    /**
     * @internal
     */
    public _$handleSelectChange() {
        this._checkSelectAll();
    }

    private _filterData(filterKey?: string) {
        filterKey = filterKey ? filterKey.trim() : '';
        if (filterKey.length === 0) {
            this._$filteredData = this._data;
        }
        filterKey = filterKey.toLowerCase();
        this._$filteredData = this._data.filter(item => String(item).toLowerCase().includes(filterKey));
        this._listScrollbar && this._listScrollbar.scrollToTop();
    }

    private _checkSelectAll() {
        if (this._$filteredData.length === 0 || !this._$selectedItems || this._$selectedItems.length === 0) {
            this._$selectAllChecked = CheckBoxStatus.unchecked;
            return;
        }

        if (this._$filteredData.every(data => this._$selectedItems.includes(data))) {
            this._$selectAllChecked = CheckBoxStatus.checked;
            return;
        }

        if (this._$filteredData.some(data => this._$selectedItems.includes(data))) {
            this._$selectAllChecked = CheckBoxStatus.indeterminate;
            return;
        }

        this._$selectAllChecked = CheckBoxStatus.unchecked;
    }

    /**
     * @internal
     */
    public _$selectAll() {
        if (this._$filteredData.length === 0) {
            return;
        }

        if (this._$selectAllChecked === CheckBoxStatus.checked) {
            if (this._$selectedItems?.length > 0) {
                this._$filteredData.forEach(data => {
                    if (!this._$selectedItems.includes(data)) {
                        this._$selectedItems = this._$selectedItems.concat([data]);
                    }
                })
            } else {
                this._$selectedItems = new ArrayCollection(this._$filteredData);
            }
        } else if (this._$selectAllChecked === CheckBoxStatus.unchecked && this._$selectedItems?.length > 0) {
            this._$selectedItems = this._$selectedItems.filter(data => !this._$filteredData.includes(data));
        }
        this._changeDetector.markForCheck();
    }

    public filterConfirm(field: string) {
        const colIndex = this.tableData.field.findIndex(item => item === field);
        if (colIndex === -1) {
            console.error(`This field: ${field} not support header filter.`)
            this.filterCancel();
            return;
        }

        const filterIndex = this.tableData.filterInfo.headerFilters.findIndex(item => item.field === field);
        if (this._$selectedItems.length === 0) {
            if (filterIndex !== -1) {
                this.tableData.filterInfo.headerFilters.splice(filterIndex, 1);
                this._autoFilterData();
                this.filterCancel();
            } else {
                this.filterCancel();
            }
            return;
        }

        if (filterIndex !== -1) {
            this.tableData.filterInfo.headerFilters[filterIndex].selectKeys = this._$selectedItems.concat([]);
        } else {
            this.tableData.filterInfo.headerFilters.push({field: field, selectKeys: this._$selectedItems.concat([])});
        }
        this._autoFilterData();
        this.filterCancel();
    }

    public filterCancel() {
        if (!this.float) {
            return;
        }
        this.float.closeFloat();
    }

    private _autoFilterData() {
        this.hostInstance.headerFilterChange.emit(this.tableData.filterInfo.headerFilters);
        this.tableData.filter(this.tableData.filterInfo);
    }

    private _initData(data: string[]): void {
        this._$dataStatus = 'resolved';
        this._data = data;
        const found = this.tableData.filterInfo.headerFilters?.find(item => item.field === this.field);
        if (found) {
            this._$selectedItems = found.selectKeys;
        } else {
            this._$selectedItems = new ArrayCollection([]);
        }
        this._$handleSearching('');
    }

    ngOnInit(): void {
        const data = this.tableData.getDistinctColumnData(this.field);
        if (data instanceof Array) {
            this._initData(data);
            return;
        }

        this._$dataStatus = 'loading';
        const promise: Promise<any[]> = isObservable(data) ? data.toPromise() : data;
        promise.then((resolvedData: string[]) => this._initData(resolvedData));
    }
}
