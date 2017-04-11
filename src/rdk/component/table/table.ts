import {
    Component, Input, NgModule, ComponentFactoryResolver, AfterViewInit, ViewChild, Type, ChangeDetectorRef, ElementRef,
    Renderer2, OnInit
} from "@angular/core";
import {CommonModule} from "@angular/common";

import {RdkRendererHost} from "../core";
import {TableData} from "../../core/data/table-data";
import {TableCellRenderer, ColumnSetting, AdditionalColumnSetting} from "./table-api";

import {RdkScrollBarModule} from "../scrollbar/scrollbar";
import {RdkScrollBar} from "../scrollbar/scrollbar";
import {SortAs, SortOrder} from "../../core/data/component-data";

class HeadSetting {
    cellData: string;
    width: string|number;
    visible: boolean;
    renderer: Type<TableCellRenderer>;
    class: string;
    sortable: boolean;
    sortAs: SortAs;
    defaultSortOrder: SortOrder;
    pos: number;
}

class CellSetting {
    cellData: string|number;
    visible: boolean;
    renderer: Type<TableCellRenderer>;
    class: string;
    editable: boolean;
    editorRenderer: Type<TableCellRenderer>;
    group: boolean;
    pos: number;
    rowSpan: number;
    merged: boolean;
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
    public columns: ColumnSetting[];

    @Input()
    public additionalColumns: AdditionalColumnSetting[];

    private _fixedHead: HTMLElement;

    private _headSettings: Array<HeadSetting> = [];

    private _cellSettings: Array<CellSetting>[] = [];

    @ViewChild(RdkScrollBar) private _scrollBar: RdkScrollBar;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {

    }

    /*
     * data和columns数据合并转换
     * */
    private _transformData(): void {
        //初始化_headSettings
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
                pos: index
            })
        });

        //初始化_cellSettings
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
                    pos: index,
                    rowSpan: 1
                })
            });
            this._cellSettings.push(cellSettings);
        });

        //列定义数据转换
        this.columns && this.columns.forEach(column => {
            if (column.target instanceof Function) {
                let fields = this.data.field.filter(column.target);
                fields.forEach(field => {
                    this._mergeSettings(this.data.field.indexOf(field), column);
                })
            }
            else if (column.target instanceof Array) {
                const a: (string|number)[] = column.target;
                a.forEach(targetItem => {
                    if (typeof targetItem === 'number') {
                        this._mergeSettings(targetItem, column);
                    } else if (typeof targetItem === 'string') {
                        this._mergeSettings(this.data.field.indexOf(targetItem), column);
                    }
                })
            }
            else if (typeof column.target === 'number') {
                this._mergeSettings(column.target, column);
            } else if (typeof column.target === 'string') {
                this._mergeSettings(this.data.field.indexOf(column.target), column);
            }
        });

        //其他列定义数据转换
        this.additionalColumns && this.additionalColumns.forEach(additionalColumn => {
            let pos = additionalColumn.pos;
            pos = pos >= 0 && pos < this.data.header.length ? pos : -1;
            this._insertSettings(pos, additionalColumn);
        });

        //过滤掉不显示的表头
        this._headSettings = this._headSettings ? this._headSettings.filter(headSetting => headSetting.visible) : null;
        this._cellSettings && this._cellSettings.forEach((cellSettings, index) => {
            this._cellSettings[index] = cellSettings.filter(cellSetting => cellSetting.visible);
        });

        let rowSpans: number[] = [];
        this._cellSettings.forEach((cellSettings, rowIndex) => {
            cellSettings.forEach((cellSetting, colIndex) => {
                let rowSpan: number = 1;
                if (rowIndex == 0) {
                    if (!cellSetting.group) {
                        rowSpans.push(1);
                        cellSetting.rowSpan = 1;
                    } else {
                        for (let i = 0; i < this._cellSettings.length - rowIndex - 1; i++) {
                            if (this._cellSettings[rowIndex + i + 1][colIndex].cellData == cellSetting.cellData) {
                                rowSpan += 1;
                                if(i == this._cellSettings.length - rowIndex - 2){
                                    rowSpans.push(rowSpan);
                                    cellSetting.rowSpan = rowSpan;
                                }
                            } else {
                                rowSpans.push(rowSpan);
                                cellSetting.rowSpan = rowSpan;
                                break;
                            }
                        }
                    }
                } else {
                    if (!cellSetting.group) {
                        cellSetting.rowSpan = 1;
                    } else if (rowSpans[colIndex] != 1) {
                        rowSpans[colIndex] -= 1;
                        cellSetting.rowSpan = 0;
                    } else {
                        for (let i = 0; i < this._cellSettings.length - rowIndex - 1; i++) {
                            if (this._cellSettings[rowIndex + i + 1][colIndex].cellData == cellSetting.cellData) {
                                rowSpan += 1;
                                if(i == this._cellSettings.length - rowIndex - 2){
                                    rowSpans[colIndex] = rowSpan;
                                    cellSetting.rowSpan = rowSpans[colIndex];
                                }
                            } else {
                                rowSpans[colIndex] = rowSpan;
                                cellSetting.rowSpan = rowSpans[colIndex];
                                break;
                            }
                        }
                    }
                }


            })
        })
        console.log(this._cellSettings);

    }

    private _mergeSettings(index, column: ColumnSetting): void {
        this._mergeHeaderSetting(index, column);
        this._mergeCellSetting(index, column);
    }

    /*
     * 根据column修改表头列数据
     * */
    private _mergeHeaderSetting(index, column: ColumnSetting): void {
        if (index >= 0 && index < this.data.header.length) {
            this._generateHeaderSetting(this._headSettings[index], column);
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

    private _insertSettings(pos, additionalColumn: AdditionalColumnSetting): void {
        this._insertHeaderSetting(pos, additionalColumn);
        this._insertCellSetting(pos, additionalColumn);
    }

    /*
     * 插入表头列
     * */
    private _insertHeaderSetting(pos, additionalColumn: AdditionalColumnSetting): void {
        let headSetting: HeadSetting = {
            cellData: '',
            width: null,
            visible: true,
            renderer: null,
            class: '',
            sortable: false,
            sortAs: SortAs.string,
            defaultSortOrder: SortOrder.default,
            pos: -1 //-1代表插入列
        };
        headSetting = this._generateHeaderSetting(headSetting, additionalColumn);
        if (pos != -1) {
            const index = this._headSettings.indexOf(this._headSettings.find(headSetting => headSetting.pos == pos));
            this._headSettings.splice(index, 0, headSetting);
        } else {
            this._headSettings.push(headSetting)
        }
    }

    /*
     * 插入单元格列
     * */
    private _insertCellSetting(pos, additionalColumn: AdditionalColumnSetting): void {
        let cellSetting: CellSetting = {
            cellData: '',
            visible: true,
            renderer: null,
            class: '',
            editable: false,
            editorRenderer: null,
            group: false,
            pos: -1, //-1代表插入列
            rowSpan: 1,
            merged: false
        };
        cellSetting = this._generateCellSetting(cellSetting, additionalColumn);

        if (pos != -1) {
            this._cellSettings.forEach((cellSettings) => {
                let cellSettingClone: CellSetting = <CellSetting>this._clone(cellSetting);
                const index = cellSettings.indexOf(cellSettings.find(cellSetting => cellSetting.pos == pos));
                cellSettings.splice(index, 0, cellSettingClone);
                /*const index = cellSettings.indexOf(cellSettings.find(cellSetting => cellSetting.pos == pos));
                 cellSettings.splice(index, 0, cellSetting);*/
            })
        } else {
            this._cellSettings.forEach((cellSettings) => {
                let cellSettingClone: CellSetting = <CellSetting>this._clone(cellSetting);
                cellSettings.push(cellSettingClone);
                // cellSettings.push(cellSetting);
            })
        }
    }

    /*
     * 简单对象的拷贝
     * */
    private _clone(obj: Object): Object {
        let copy = (obj instanceof Array) ? [] : {};
        for (let attr in obj) {
            if (!obj.hasOwnProperty(attr)) continue;
            copy[attr] = (typeof obj[attr] == "object") ? this._clone(obj[attr]) : obj[attr];
        }
        return copy;
    }

    /*
     * 根据column的数据生成headSetting，支持多个column数据的合并
     * */
    private _generateHeaderSetting(headSetting: HeadSetting, column: ColumnSetting | AdditionalColumnSetting): HeadSetting {
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
    private _generateCellSetting(cellSetting: CellSetting, column: ColumnSetting | AdditionalColumnSetting): CellSetting {
        cellSetting.visible = column.visible === true || column.visible === false ? column.visible : cellSetting.visible;

        const cell = column.cell;
        if (cell) {
            cellSetting.renderer = cell.renderer ? cell.renderer : cellSetting.renderer;
            cellSetting.class = typeof cell.class == 'string' && cell.class !== '' ? cellSetting.class + " " + cell.class : cellSetting.class;
            cellSetting.editable = cell.editable === true || cell.editable === false ? cell.editable : cellSetting.editable;
            cellSetting.editorRenderer = cell.editorRenderer ? cell.editorRenderer : cellSetting.editorRenderer;
            cellSetting.group = column.group === true || column.group === false ? column.group : cellSetting.group;
        }
        return cellSetting;
    }

    ngAfterViewInit() {
        this._fixedHead = this._elementRef.nativeElement.querySelector(".rdk-table-fixed-head");

        //调整滚动条位置
        this._renderer.setStyle(this._elementRef.nativeElement.querySelector('.mCSB_scrollTools_vertical'), 'margin', this._fixedHead.offsetHeight + 'px 0 0');

        this._scrollBar.whileScrolling.subscribe(scrollEvent => {
            if (scrollEvent.direction == 'x') {
                this._renderer.setStyle(this._fixedHead, 'left', scrollEvent.left + 'px');
            }
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
                    <span (click)="_sortUp()" class="rdk-table-sort-btn rdk-table-sort-up"></span>
                    <span (click)="_sortDown()" class="rdk-table-sort-btn rdk-table-sort-down"></span>
               </div>`,
    styleUrls: ['table-head.scss']
})
export class RdkTableHeader extends TableCellBasic implements OnInit {
    private _sortOrder: SortOrder = SortOrder.default;

    private _sortOrderClass: object = {};

    private _setSortOrderClass(): void {
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

    private _sortUp(): void {
        this._sortOrder = SortOrder.asc;
        this._setSortOrderClass();
    }

    private _sortDown(): void {
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
