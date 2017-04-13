import {Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit} from "@angular/core";
import {TableCellRenderer} from "../../../../../component/table/table-api";
import {RdkInput} from "../../../../../component/input/input";

/*
 * 自定义表头渲染组件
 * */
@Component({
    template: '<span class="fa fa-map-signs"></span>{{cellData}}'
})
export class TableHead extends TableCellRenderer {
}

/*
 * 自定义单元格渲染组件
 * */
@Component({
    template: '<span>{{cellData}}</span>'
})
export class TableCell extends TableCellRenderer {
}

/*
 * 自定义表头渲染组件
 * */
@Component({
    template: `{{cellData}} <rdk-select [(value)]="selectedCityForSelect"
                   placeholder="请选择"
                   [data]="cityListForSelect" width="70" height="20">
               </rdk-select>`
})
export class TableHeadSelect extends TableCellRenderer {
    cityListForSelect = [
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ];
}

/*
 * 编辑单元格渲染器
 * */
@Component({
    template: `<rdk-input #input [(value)]="cellData" width="100%" [clearable]="false" (blur)="_goText()"></rdk-input>`
})
export class TableCellEditor extends TableCellRenderer implements AfterViewInit{

    @ViewChild(RdkInput) input: RdkInput;

    _goText(): void {
        this.changeToText.emit(this.cellData);
    }

    ngAfterViewInit(){
        this.input.focus();
    }

}

/*
 * 编辑单元格渲染器
 * */
@Component({
    template: `<div [ngClass]="_cellClass"><span (click)="_goEdit()">{{cellData}}</span>
               <rdk-input [(value)]="cellData" width="100%" (blur)="_goText()"></rdk-input></div>`,
    styles: [`
        span{cursor: pointer;display: block}
        .cell-state.edit-state span{display: none}
        .cell-state.text-state rdk-input{display: none}
    `]
})
export class TableCellEditor1 extends TableCellRenderer implements OnInit {
    private _cellClass: Object;
    private _editable: boolean = false;

    @ViewChild(RdkInput) input: RdkInput;

    @Output() save: EventEmitter<any> = new EventEmitter<any>();

    _goEdit(): void {
        this._editable = true;
        this._setCellClass();
        this.input.focus();
    }

    _goText(): void {
        if(this.cellData){
            this._editable = false;
            this._setCellClass();
            this.save.emit(this);
        }
    }

    _setCellClass(): void {
        this._cellClass = {
            'cell-state': true,
            'text-state': !this._editable,
            'edit-state': this._editable
        }
    }

    ngOnInit() {
        this._setCellClass();
    }

}
