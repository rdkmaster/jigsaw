import {
    Component, Input, NgModule, ComponentFactoryResolver, AfterViewInit, ViewChild, Type, ChangeDetectorRef, ElementRef,
    Renderer2, OnInit
} from "@angular/core";
import {CommonModule} from "@angular/common";

import {RdkRendererHost} from "../core";
import {TableData} from "../../core/data/table-data";
import {TableCellRenderer} from "./table-api";

import {RdkScrollBarModule} from "../scrollbar/scrollbar";
import {RdkScrollBar} from "../scrollbar/scrollbar";
import {SortAs, SortOrder} from "../../core/data/component-data";

class HeadSetting {
    cellData: string;
    width: string|number;
    visible: boolean;
    renderer: Type<TableCellBasic>;
    class: string;
    sortable: boolean;
    sortAs: SortAs;
    defaultSortOrder: SortOrder;
}

class CellSetting {
    cellData: string|number;
    visible: boolean;
    renderer: Type<TableCellBasic>;
    class: string;
    editable: boolean;
    editorRenderer: Type<TableCellBasic>;
    group: boolean;
}

export class TableCellBasic implements AfterViewInit {
    constructor(private _componentFactoryResolver: ComponentFactoryResolver,
                private _changeDetector: ChangeDetectorRef) {
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
    protected renderer: Type<TableCellRenderer>;

    @ViewChild(RdkRendererHost) rendererHost: RdkRendererHost;

    ngAfterViewInit(): void {
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.renderer);
        let viewContainerRef = this.rendererHost.viewContainerRef;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.tableData = this.tableData;
        componentRef.instance.cellData = this.cellData;
        componentRef.instance.row = this.row;
        componentRef.instance.column = this.column;
        this._changeDetector.detectChanges();
    }
}

@Component({
    selector: 'rdk-table',
    templateUrl: 'table.html',
    styleUrls: ['table.scss']
})
export class RdkTable implements AfterViewInit {
    @Input()
    public data: TableData;

    @Input()
    public columns: any[];

    @Input()
    public additionalColumns: any[];

    private _fixedHead: HTMLElement;

    private _headSettings: Array<HeadSetting> = [];

    private _cellSettings: Array<CellSetting>[] = [];

    @ViewChild(RdkScrollBar) private _scrollBar: RdkScrollBar;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {

    }

    /*
     * data和columns数据合并转换
     * */
    private _transformData() {
        //初始化_headSettings
        this.data.header.forEach(cellData => {
            this._headSettings.push({
                cellData: cellData,
                width: null,
                visible: true,
                renderer: null,
                class: '',
                sortable: false,
                sortAs: SortAs.string,
                defaultSortOrder: SortOrder.default
            })
        });

        //初始化_cellSettings
        this.data.data.forEach(row => {
            let cellSettings = [];
            row.forEach(cellData => {
                cellSettings.push({
                    cellData: cellData,
                    visible: true,
                    renderer: null,
                    class: '',
                    editable: false,
                    editorRenderer: null,
                    group: true
                })
            });
            this._cellSettings.push(cellSettings);
        });

        //列定义数据转换
        this.columns.forEach(column => {
            if (column.target instanceof Function) {
                let fields = this.data.field.filter(column.target);
                fields.forEach(field => {
                    this._mergeSettings(this.data.field.indexOf(field), column);
                })
            }
            else if (column.target instanceof Array) {
                column.target.forEach(targetItem => {
                    if (!isNaN(targetItem)) {
                        this._mergeSettings(targetItem, column);
                    } else {
                        this._mergeSettings(this.data.field.indexOf(targetItem), column);
                    }
                })
            }
            else if (!isNaN(column.target)) {
                this._mergeSettings(column.target, column);
            } else {
                this._mergeSettings(this.data.field.indexOf(column.target), column);
            }
        });

        //其他列定义数据转换
        this.additionalColumns.forEach(additionalColumn => {
            let index = additionalColumn.pos;
            index = index >= 0 && index < this.data.header.length ? index : -1;
            this._insertSettings(index, additionalColumn);
        });

        //过滤掉不显示的表头
        this._headSettings = this._headSettings.filter(headSetting => headSetting.visible);
        this._cellSettings.forEach((cellSettings, index) => {
            this._cellSettings[index] = cellSettings.filter(cellSetting => cellSetting.visible);
        })
    }

    private _mergeSettings(index, column) {
        this._mergeHeaderSetting(index, column);
        this._mergeCellSetting(index, column);
    }

    /*
     * 根据column修改表头列数据
     * */
    private _mergeHeaderSetting(index, column) {
        if (index >= 0 && index < this.data.header.length) {
            this._generateHeaderSetting(this._headSettings[index], column);
        }
    }

    /*
     * 根据column修改单元格列数据
     * */
    private _mergeCellSetting(index, column) {
        if (index >= 0 && index < this.data.header.length) {
            this._cellSettings.forEach(cellSettings => {
                this._generateCellSetting(cellSettings[index], column);
            });
        }
    }

    private _insertSettings(index, additionalColumn){
        this._insertHeaderSetting(index, additionalColumn);
        this._insertCellSetting(index, additionalColumn);
    }

    /*
     * 插入表头列
     * */
    private _insertHeaderSetting(index, additionalColumn) {
        let headSetting: HeadSetting = {
            cellData: '',
            width: null,
            visible: true,
            renderer: null,
            class: '',
            sortable: false,
            sortAs: SortAs.string,
            defaultSortOrder: SortOrder.default
        };
        headSetting = this._generateHeaderSetting(headSetting, additionalColumn);
        index != -1 ? this._headSettings.splice(index, 0, headSetting) : this._headSettings.push(headSetting);
    }

    /*
     * 插入单元格列
     * */
    private _insertCellSetting(index, additionalColumn) {
        let cellSetting: CellSetting = {
            cellData: '',
            visible: true,
            renderer: null,
            class: '',
            editable: false,
            editorRenderer: null,
            group: true
        };
        cellSetting = this._generateCellSetting(cellSetting, additionalColumn);
        index != -1 ? this._cellSettings.forEach(cellSettings => {
                cellSettings.splice(index, 0, cellSetting);
            }) : this._cellSettings.forEach(cellSettings => {
                cellSettings.push(cellSetting);
            })
    }

    /*
     * 根据column的数据生成headSetting，支持多个column数据的合并
     * */
    private _generateHeaderSetting(headSetting: HeadSetting, column: any): HeadSetting {
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
    private _generateCellSetting(cellSetting: CellSetting, column: any): CellSetting {
        cellSetting.visible = column.visible === true || column.visible === false ? column.visible : cellSetting.visible;

        const cell = column.cell;
        if (cell) {
            cellSetting.renderer = cell.renderer ? cell.renderer : cellSetting.renderer;
            cellSetting.class = typeof cell.class == 'string' && cell.class !== '' ? cellSetting.class + " " + cell.class : cellSetting.class;
            cellSetting.editable = cell.editable === true || cell.editable === false ? cell.editable : cellSetting.editable;
            cellSetting.editorRenderer = cell.editorRenderer ? cell.editorRenderer : cellSetting.editorRenderer;
            cellSetting.group = cell.group === true || cell.group === false ? cell.group : cellSetting.group;
        }
        return cellSetting;
    }

    ngAfterViewInit() {
        this._fixedHead = this._elementRef.nativeElement.querySelector(".rdk-table-fixed-head");
        $(() => {
            this._scrollBar.whileScrolling.subscribe(scrollEvent => {
                if (scrollEvent.direction == 'x') {
                    this._renderer.setStyle(this._fixedHead, 'left', scrollEvent.left + 'px');
                }
            })
        });

        this._transformData();
    }

}

/*
 * 单元格插入点
 * */
@Component({
    selector: '[rdk-table-cell]',
    template: '<template rdk-renderer-host></template>'
})
export class RdkTableCell extends TableCellBasic implements OnInit {

    @Input()
    public editable: boolean = false;

    @Input()
    public editorRenderer: Type<TableCellBasic>;

    @Input()
    public group: boolean;

    constructor(cfr: ComponentFactoryResolver, cd: ChangeDetectorRef) {
        super(cfr, cd);
    }

    ngOnInit() {
        //设置默认渲染器
        this.renderer = this.renderer ? this.renderer : DefaultCellRenderer;
    }
}

/*
 * 表头插入点
 * */
@Component({
    selector: '[rdk-table-header]',
    template: `<template rdk-renderer-host></template>
               <div *ngIf="sortable" [ngClass]="_sortOrderClass">
                    <span (click)="sortUp()" class="rdk-table-sort-btn rdk-table-sort-up"></span>
                    <span (click)="sortDown()" class="rdk-table-sort-btn rdk-table-sort-down"></span>
               </div>`,
    styleUrls: ['table-head.scss']
})
export class RdkTableHeader extends TableCellBasic implements OnInit {
    private _sortOrder: SortOrder = SortOrder.default;

    private _sortOrderClass: object = {};

    private _setSortOrderClass() {
        this._sortOrderClass = {
            'rdk-table-sort-box': true,
            'rdk-table-asc': this._sortOrder == SortOrder.asc,
            'rdk-table-des': this._sortOrder == SortOrder.des
        }
    }

    @Input() public sortable: boolean;

    @Input() public sortAs: SortAs;

    @Input()
    public set defaultSortOrder(newValue) {
        if (newValue != null) {
            this._sortOrder = newValue
        }
    };

    constructor(cfr: ComponentFactoryResolver, cd: ChangeDetectorRef) {
        super(cfr, cd);
    }

    sortUp() {
        this._sortOrder = SortOrder.asc;
        this._setSortOrderClass();
    }

    sortDown() {
        this._sortOrder = SortOrder.des;
        this._setSortOrderClass();
    }

    ngOnInit() {
        //设置默认渲染器
        this.renderer = this.renderer ? this.renderer : DefaultCellRenderer;

        this._setSortOrderClass();
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
