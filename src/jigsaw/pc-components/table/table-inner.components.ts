import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EmbeddedViewRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, TemplateRef, Type, ViewChild, Directive, NgZone } from "@angular/core";
import {AbstractJigsawViewBase, JigsawRendererHost} from "../../common/common";
import {_getColumnIndex, AdditionalTableData, SortChangeEvent, TableDataChangeEvent} from "./table-typings";
import {DefaultCellRenderer, TableCellRendererBase} from "./table-renderer";
import {TableData} from "../../common/core/data/table-data";
import {SortAs, SortOrder} from "../../common/core/data/component-data";
import {CommonUtils} from "../../common/core/utils/common-utils";

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
        if (this.rendererHost) {
            this.rendererHost.viewContainerRef.clear();
        }
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
        if(this.rendererRef instanceof ComponentRef) {
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
     * 渲染器制造工厂
     */
    protected rendererFactory(renderer: Type<TableCellRendererBase> | TemplateRef<any>, initData: any): ComponentRef<TableCellRendererBase> | EmbeddedViewRef<any> {
        console.log(this.rendererHost)
        if (renderer instanceof TemplateRef) {
            return this.rendererHost.viewContainerRef.createEmbeddedView(renderer, {
                context: {
                    tableData: this.tableData, additionalData: this.additionalData,
                    cellData: this.cellData, row: this.row, field: this.field
                }
            });
        } else {
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(renderer);
            let componentRef = this.rendererHost.viewContainerRef.createComponent(componentFactory);
            componentRef.instance.row = this.row;
            componentRef.instance.field = this.field;
            componentRef.instance.tableData = this.tableData;
            componentRef.instance.additionalData = this.additionalData;
            componentRef.instance.cellData = this.cellData;
            componentRef.instance.hostInstance = this.hostInstance;
            componentRef.instance.initData = initData;
            return componentRef;
        }
    }

    /*
     * 插入渲染器
     * */
    protected insertRenderer() {
        if(this.renderer != 'html') {
            this.rendererRef = this.rendererFactory(this.renderer, this.rendererInitData);
            this.changeDetector.detectChanges();
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this._initTargetData();
    }

    ngAfterViewInit(): void {
        if(this.renderer != 'html') {
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
    selector: 'jigsaw-table-header',
    template: `
        <div class="jigsaw-table-header-cell" [style.padding-right]="sortable ? '14px' : '0'">
            <ng-template jigsaw-renderer-host></ng-template>
            <div *ngIf="renderer == 'html'" class="jigsaw-table-header-content" [trustedHtml]="headerTrustedHtml"
                 [trustedHtmlContext]="headerTrustedHtmlContext"></div>
            <div *ngIf="sortable" [ngClass]="_$sortOrderClass">
                <span (click)="_$sortAsc()" class="jigsaw-table-sort-btn jigsaw-table-sort-up"></span>
                <span (click)="_$sortDes()" class="jigsaw-table-sort-btn jigsaw-table-sort-down"></span>
            </div>
        </div>`
})
export class JigsawTableHeaderInternalComponent extends TableInternalCellBase implements OnInit, OnDestroy {
    constructor(resolver: ComponentFactoryResolver, changeDetector: ChangeDetectorRef, protected _zone: NgZone) {
        super(resolver, changeDetector, _zone);
    }

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
    public headerTrustedHtml: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public headerTrustedHtmlContext: any;

    /**
     * @internal
     */
    public _$sortOrderClass: Object;

    public updateSortOrderClass(sortOrder: SortOrder): void {
        this._$sortOrderClass = {
            'jigsaw-table-sort-box': true,
            'jigsaw-table-asc': sortOrder == SortOrder.asc,
            'jigsaw-table-des': sortOrder == SortOrder.desc
        }
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
    };

    @Output()
    public sort: EventEmitter<SortChangeEvent> = new EventEmitter<SortChangeEvent>();

    /**
     * @internal
     */
    public _$sortAsc(): void {
        if (this._$sortOrderClass['jigsaw-table-asc']) {
            return;
        }
        this._sort(SortOrder.asc);
    }

    /**
     * @internal
     */
    public _$sortDes(): void {
        if (this._$sortOrderClass['jigsaw-table-des']) {
            return;
        }
        this._sort(SortOrder.desc);
    }

    private _sort(order: SortOrder): void {
        this.updateSortOrderClass(order);
        this.sort.emit({sortAs: this.sortAs, order: order, field: this.field});
        this.tableData.sort(this.sortAs, order, this.field);
    }

    ngOnInit() {
        super.ngOnInit();
        //设置默认渲染器
        this.renderer = this.renderer ? this.renderer : DefaultCellRenderer;
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
        if (this._editable) {
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

    public editorRendererRef: ComponentRef<TableCellRendererBase> | EmbeddedViewRef<any>;

    private _goEditCallback: () => void;

    constructor(cfr: ComponentFactoryResolver, cd: ChangeDetectorRef,
                private _renderer: Renderer2, private _elementRef: ElementRef, protected _zone: NgZone) {
        super(cfr, cd, _zone);
    }

    private _emitDataChange(cellData: string | number): void {
        let rows = [];
        for (let i = 0; i < this.rowSpan; i++) {
            rows.push(this.row + i);
            // update tableData directly, therefor table.ts need not to do this.
            this.targetData.data[this.row + i][this.column] = cellData;
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
            this._emitDataChange(cellData);
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
            this.rendererHost.viewContainerRef.clear();

            this.runMicrotask(() => {
                this.insertRenderer();
                this._setGoEditListener();
            });
        });
    }

    /*
     * 插入渲染器
     * */
    protected insertRenderer() {
        super.insertRenderer();
        if (this.rendererRef instanceof ComponentRef) {
            this._rendererSubscribe(this.rendererRef.instance);
        }
    }

    /*
     * 插入编辑渲染器
     * */
    protected insertEditorRenderer() {
        this.editorRendererRef = this.rendererFactory(this.editorRenderer, this.editorRendererInitData);
        if (this.editorRendererRef instanceof ComponentRef) {
            this._editorRendererSubscribe(this.editorRendererRef.instance);
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
        if (this._goEditCallback) {
            this._goEditCallback();
        }
        this._goEditCallback = this._editable ? this._renderer.listen(
            this._elementRef.nativeElement.parentElement, 'click', () => {
                this.rendererHost.viewContainerRef.clear();
                this.insertEditorRenderer();
            }) : null;
    }

    ngOnInit() {
        super.ngOnInit();

        //设置默认渲染器
        this.renderer = this.renderer ? this.renderer : DefaultCellRenderer;

        if (this._editable) {
            this._renderer.setStyle(this._elementRef.nativeElement.parentElement, 'cursor', 'pointer');
            //绑定点击事件
            this._setGoEditListener();
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

        if (this.editorRendererRef instanceof ComponentRef) {
            this.editorRendererRef.instance.cellDataChange.unsubscribe();
        }
    }
}
