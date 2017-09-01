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
import {JigsawRendererHost} from "../core";
import {SortChangeEvent, TableCellRenderer} from "../table/table-api";
import {TableData} from "../../core/data/table-data";
import {SortAs, SortOrder} from "../../core/data/component-data";
import {DefaultCellRenderer} from "../table/table-renderer";

export class TableCellBasic implements AfterViewInit {
    constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                protected changeDetector: ChangeDetectorRef) {
    }

    @Input()
    public tableData: TableData;
    @Input()
    public cellData:any;
    @Input()
    public row: number;
    @Input()
    public column: number;
    @Input()
    public field: number;
    @Input()
    public renderer: Type<TableCellRenderer> | TemplateRef<any>;
    @Output()
    public change = new EventEmitter<any>();

    protected rendererRef: ComponentRef<TableCellRenderer> | EmbeddedViewRef<any>;

    @ViewChild(JigsawRendererHost)
    protected rendererHost: JigsawRendererHost;


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

@Component({
    selector: 'jigsaw-table-header',
    template: `
        <div class="jigsaw-table-header-cell">
            <ng-template jigsaw-renderer-host></ng-template>
            <div *ngIf="sortable" [ngClass]="_sortOrderClass">
                <span (click)="tableData.sort(sortAs, sortAsc, field)" class="jigsaw-table-sort-btn jigsaw-table-sort-up"></span>
                <span (click)="tableData.sort(sortAs, sortDes, field)" class="jigsaw-table-sort-btn jigsaw-table-sort-down"></span>
            </div>
        </div>`,
    styleUrls: ['table-head.scss']
})
/**
 * 表头单元格
 *
 * @internal
 */
export class JigsawTableHeaderInternalComponent extends TableCellBasic implements OnInit, OnDestroy {
    constructor(resolver: ComponentFactoryResolver, changeDetector: ChangeDetectorRef) {
        super(resolver, changeDetector);
    }

    public sortAsc = SortOrder.asc;
    public sortDes = SortOrder.des;

    @Input() public sortable: boolean;

    @Input() public sortAs: SortAs;

    private _sortOrderClass: Object;

    private _setSortOrderClass(sortOrder: SortOrder): void {
        this._sortOrderClass = {
            'jigsaw-table-sort-box': true,
            'jigsaw-table-asc': sortOrder == SortOrder.asc,
            'jigsaw-table-des': sortOrder == SortOrder.des
        }
    }

    @Input()
    public set defaultSortOrder(newValue) {
        if (newValue != null) {
            this._setSortOrderClass(newValue);
        }
    };

    @Output()
    public sort: EventEmitter<SortChangeEvent> = new EventEmitter<SortChangeEvent>();

    // private _sortAsc(): void {
    //     this._sort(SortOrder.asc);
    // }
    //
    // private _sortDes(): void {
    //     this._sort(SortOrder.des);
    // }
    //
    // private _sort(order: SortOrder): void {
    //     this._setSortOrderClass(order);
    //     // this.sort.emit({sortAs: this.sortAs, order: order, field: this.field});
    //     this.tableData.sort(this.sortAs, order, this.field);
    // }

    // private _emitDataChange(tableHeadChangeEvent: TableHeadChangeEvent): void {
        // //更新tableData
        // for (let row of tableHeadChangeEvent.rows) {
        //     this.tableData.data[row][this.field] = tableHeadChangeEvent.cellData;
        // }

        // this._jigsawTable.dataChange.emit({
        //     field: this.tableData.field[this.field],
        //     row: tableHeadChangeEvent.rows,
        //     column: this.column,
        //     rawColumn: this.field,
        //     cellData: tableHeadChangeEvent.cellData,
        //     oldCellData: tableHeadChangeEvent.oldCellData
        // });
    // }

    /*
     * 插入渲染器
     * */
    // protected insertRenderer() {
    //     super.insertRenderer();
    //     if (this.rendererRef instanceof ComponentRef) {
    //         this.rendererRef.instance.cellDataChange.subscribe(event => this.change.emit(event));
    //     }
    // }

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

// @Component({
//     selector: 'jigsaw-table-cell',
//     template: '<span>{{settings.cellData}}</span>'
// })
// /**
//  * @internal
//  */
// export class JigsawTableCellInternalComponent extends AbstractJigsawComponent {
//     @Input() settings: TableCellSetting;
//     constructor() {
//         super();
//         console.log('dddddddddddd');
//     }
// }


@Component({
    selector: 'jigsaw-table-cell',
    template: '<ng-template jigsaw-renderer-host></ng-template>'
})
/**
 * 单元格渲染器
 */
export class JigsawTableCellInternalComponent extends TableCellBasic implements OnInit, OnDestroy {

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
                // @Optional() jigsawTable: JigsawTable,
                private _renderer: Renderer2,
                private _elementRef: ElementRef) {
        super(cfr, cd/*, jigsawTable*/);
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
        // this._jigsawTable.dataChange.emit({
        //     field: this.tableData.field[this.field],
        //     row: rows,
        //     column: this.column,
        //     rawColumn: this.field,
        //     cellData: this.cellData,
        //     oldCellData: oldCellData
        // });
    }

    private _cacheRenderer(renderer: TableCellRenderer, editorRenderer: TableCellRenderer) {
        // let rendererInfo = this._jigsawTable.allRenderers.find(renderer =>
        //     renderer.row == this.row && renderer.column == this.column);
        // if (rendererInfo) {
        //     rendererInfo.renderer = renderer;
        //     rendererInfo.editorRenderer = editorRenderer;
        // } else {
        //     this._jigsawTable.allRenderers.push({
        //         row: this.row,
        //         column: this.column,
        //         rawColumn: this.field,
        //         renderer: renderer,
        //         editorRenderer: editorRenderer
        //     })
        // }
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
            // //重新对齐表头
            // this._jigsawTable._asyncSetFixedHeadWidth();
            // //重新绑定td的tooltip
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
        // console.log(this.cellData);
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
