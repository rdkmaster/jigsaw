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

export class HeadData {
    cellData: string;
    width: string|number;
    visible: boolean;
    renderer: Type<TableCellBasic>;
    class: string;
    sortable: boolean;
    sortAs: string|number;
    defaultSortOrder: SortOrder;
}

export enum SortAs{
    string, number
}

export enum SortOrder{
    des, asc, default
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
export class RdkTable implements AfterViewInit{
    @Input()
    public data: TableData;

    @Input()
    public columns: any[];

    private _fixedHead: HTMLElement;

    private _headDatas: Array<HeadData> = [];

    @ViewChild(RdkScrollBar) private _scrollBar: RdkScrollBar;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef){

    }

    /*
    * data和columns数据合并转换
    * */
    private _transformData(){
        this.data.header.forEach(cellData => {
            this._headDatas.push({
                cellData: cellData,
                width: null,
                visible: null,
                renderer: null,
                class: null,
                sortable: null,
                sortAs: null,
                defaultSortOrder: null
            })
        });
        this.columns.forEach(column => {
            if(!isNaN(column.target)){
                let index = column.target;
                this._mergeHeaderData(index, column);
            }else{
                let index = this.data.field.indexOf(column.target);
                this._mergeHeaderData(index, column);
            }
        });

        //过滤掉不显示的表头
        this._headDatas = this._headDatas.filter(headData => headData.visible);
    }

    /*
    * 合并data和columns里的header数据
    * */
    private _mergeHeaderData(index, column){
        let header = column.header;
        if(index >= 0 && index < this.data.header.length){
            let headDate: HeadData = this._headDatas[index];
            headDate.width = column.width;
            headDate.visible = column.visible;
            if(header){
                headDate.renderer = header.renderer;
                headDate.class = header.class;
                headDate.sortable = header.sortable;
                headDate.sortAs = header.sortAs;
                headDate.defaultSortOrder = header.defaultSortOrder;
            }
        }
    }

    ngAfterViewInit(){
        this._fixedHead = this._elementRef.nativeElement.querySelector(".rdk-table-fixed-head");
        $(() => {
            this._scrollBar.whileScrolling.subscribe(scrollEvent => {
                if(scrollEvent.direction == 'x'){
                    this._renderer.setStyle(this._fixedHead, 'left', scrollEvent.left+'px');
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
export class RdkTableCell extends TableCellBasic implements OnInit{
    constructor(cfr: ComponentFactoryResolver, cd: ChangeDetectorRef) {
        super(cfr, cd);
    }

    ngOnInit(){
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
                    <span (click)="sortUp()" class="fa fa-sort-up rdk-table-sort rdk-table-sort-up"></span>
                    <span (click)="sortDown()" class="fa fa-sort-down rdk-table-sort rdk-table-sort-down"></span>
               </div>`,
    styleUrls: ['table-head.scss']
})
export class RdkTableHeader extends TableCellBasic implements OnInit{
    private _sortOrder: SortOrder = SortOrder.default;

    private _sortOrderClass: object = {};

    private _setSortOrderClass(){
        this._sortOrderClass = {
            'rdk-table-asc': this._sortOrder == SortOrder.asc,
            'rdk-table-des': this._sortOrder == SortOrder.des
        }
    }

    @Input() public sortable: boolean;

    @Input() public sortAs: string|number;

    @Input()
    public set defaultSortOrder(newValue){
        if(newValue != null){
            this._sortOrder = newValue
        }
    };

    constructor(cfr: ComponentFactoryResolver, cd: ChangeDetectorRef) {
        super(cfr, cd);
    }

    sortUp(){
        this._sortOrder = SortOrder.asc;
        this._setSortOrderClass();
    }

    sortDown(){
        this._sortOrder = SortOrder.des;
        this._setSortOrderClass();
    }

    ngOnInit(){
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
