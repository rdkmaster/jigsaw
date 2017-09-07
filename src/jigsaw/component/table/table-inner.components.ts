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
    ViewChild
} from "@angular/core";
import {JigsawRendererHost} from "../common";
import {SortChangeEvent, TableDataChangeEvent} from "./table-typings";
import {TableData} from "../../core/data/table-data";
import {SortAs, SortOrder} from "../../core/data/component-data";
import {DefaultCellRenderer, TableCellRendererBase} from "../table/table-renderer";
import {CommonUtils} from "../../core/utils/common-utils";

export class TableInternalCellBase implements AfterViewInit {
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
    public renderer: Type<TableCellRendererBase> | TemplateRef<any>;

    protected rendererRef: ComponentRef<TableCellRendererBase> | EmbeddedViewRef<any>;

    @ViewChild(JigsawRendererHost)
    protected rendererHost: JigsawRendererHost;

    /*
     * 渲染器制造工厂
     * */
    protected rendererFactory(renderer: Type<TableCellRendererBase> | TemplateRef<any>): ComponentRef<TableCellRendererBase> | EmbeddedViewRef<any> {
        if (renderer instanceof TemplateRef) {
            return this.rendererHost.viewContainerRef.createEmbeddedView(renderer, {
                context: {cellData: this.cellData, row: this.row, column: this.column}
            });
        } else {
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(renderer);
            let componentRef = this.rendererHost.viewContainerRef.createComponent(componentFactory);
            componentRef.instance.row = this.row;
            componentRef.instance.column = this.column;
            componentRef.instance.tableData = this.tableData;
            componentRef.instance.cellData = this.cellData;
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

@Component({
    selector: 'jigsaw-table-header',
    template: `
        <div class="jigsaw-table-header-cell">
            <ng-template jigsaw-renderer-host></ng-template>
            <div *ngIf="sortable" [ngClass]="_$sortOrderClass">
                <span (click)="_$sortAsc()" class="jigsaw-table-sort-btn jigsaw-table-sort-up"></span>
                <span (click)="_$sortDes()" class="jigsaw-table-sort-btn jigsaw-table-sort-down"></span>
            </div>
        </div>`
})
/**
 * 表头单元格
 *
 * @internal
 */
export class JigsawTableHeaderInternalComponent extends TableInternalCellBase implements OnInit, OnDestroy {
    constructor(resolver: ComponentFactoryResolver, changeDetector: ChangeDetectorRef) {
        super(resolver, changeDetector);
    }

    @Input() public sortable: boolean;

    @Input() public sortAs: SortAs;

    public _$sortOrderClass: Object;

    public _$updateSortOrderClass(sortOrder: SortOrder): void {
        this._$sortOrderClass = {
            'jigsaw-table-sort-box': true,
            'jigsaw-table-asc': sortOrder == SortOrder.asc,
            'jigsaw-table-des': sortOrder == SortOrder.des
        }
    }

    @Input()
    public set defaultSortOrder(newValue) {
        if (newValue != null) {
            this._$updateSortOrderClass(newValue);
        }
    };

    @Output()
    public sort: EventEmitter<SortChangeEvent> = new EventEmitter<SortChangeEvent>();

    public _$sortAsc(): void {
        if (this._$sortOrderClass['jigsaw-table-asc']) {
            return;
        }
        this._sort(SortOrder.asc);
    }

    public _$sortDes(): void {
        if (this._$sortOrderClass['jigsaw-table-des']) {
            return;
        }
        this._sort(SortOrder.des);
    }

    private _sort(order: SortOrder): void {
        this._$updateSortOrderClass(order);
        this.sort.emit({sortAs: this.sortAs, order: order, field: this.column});
        this.tableData.sort(this.sortAs, order, this.column);
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

@Component({
    selector: 'jigsaw-table-cell',
    template: '<ng-template jigsaw-renderer-host></ng-template>'
})
/**
 * 单元格渲染器
 */
export class JigsawTableCellInternalComponent extends TableInternalCellBase implements OnInit, OnDestroy {

    @Input()
    public editable: boolean = false;

    @Input()
    public editorRenderer: Type<TableCellRendererBase>;

    @Input()
    public group: boolean;

    @Input()
    public rowSpan: number;

    @Output()
    public edit = new EventEmitter<TableDataChangeEvent>();

    public editorRendererRef: ComponentRef<TableCellRendererBase> | EmbeddedViewRef<any>;

    private _goEditCallback: () => void;

    constructor(cfr: ComponentFactoryResolver, cd: ChangeDetectorRef,
                private _renderer: Renderer2, private _elementRef: ElementRef) {
        super(cfr, cd);
    }

    private _emitDataChange(cellData: string | number): void {
        let rows = [];
        for (let i = 0; i < this.rowSpan; i++) {
            rows.push(this.row + i);
            // update tableData directly, therefor table.ts need not to do this.
            this.tableData.data[this.row + i][this.column] = cellData;
            this.tableData.refresh();
        }

        const change:TableDataChangeEvent = {
            field: this.tableData.field[this.column],
            row: rows,
            column: this.column,
            cellData: cellData,
            oldCellData: this.cellData
        };
        this.edit.emit(change);

        this.cellData = cellData;
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
            this.rendererHost.viewContainerRef.clear();
            this.insertRenderer();
            this._setGoEditListener();
            //todo 重新对齐表头
            // this._jigsawTable._asyncSetFixedHeadWidth();
            //todo 重新绑定td的tooltip
            // this._jigsawTable._rebindTooltipForCell(this._elementRef.nativeElement, this.cellData, this.row, this.column);
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
        this.editorRendererRef = this.rendererFactory(this.editorRenderer);
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
        this._goEditCallback = this.editable ? this._renderer.listen(
            this._elementRef.nativeElement.parentElement, 'click', () => {
                this.rendererHost.viewContainerRef.clear();
                this.insertEditorRenderer();
                //todo 重新对齐表头
                // this._jigsawTable._asyncSetFixedHeadWidth();
            }) : null;
    }

    private _cellData;

    set cellData(value) {
        this._cellData = value;
        if (this.rendererRef instanceof ComponentRef) {
            this.rendererRef.instance.cellData = value;
        }
    }

    get cellData() {
        return this._cellData;
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
