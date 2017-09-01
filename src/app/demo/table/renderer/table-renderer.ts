import {Component, OnDestroy, OnInit} from "@angular/core";
import {TableCellRenderer} from "jigsaw/component/table/table-api";
import {TableData} from "../../../../jigsaw/core/data/table-data";

/*
 * 自定义表头渲染组件
 * */
@Component({
    template: '<span class="fa fa-bus"></span>{{cellData}}'
})
export class TableHeadIcon extends TableCellRenderer {
}

/*
 * 自定义表头渲染组件
 * */
@Component({
    template: `
        {{cellData}}
        <jigsaw-select [value]="selectedCityForSelect"
                       placeholder="请选择" (valueChange)="dispatchChangeEvent($event)"
                       [data]="cityListForSelect" width="70" height="20">
        </jigsaw-select>`
})
export class TableHeadSelect extends TableCellRenderer implements OnDestroy {
    selectedCityForSelect: any;
    cityListForSelect = [];

    private _removeRefreshCallback;
    private _tableData:TableData;

    set tableData(value) {
        this._tableData = value;
        if (!value) {
            return;
        }
        this._removeRefreshCallback && this._removeRefreshCallback();
        this._removeRefreshCallback = value.onRefresh(() => {
            this.cityListForSelect = [];
            value.data.forEach(row => {
                if (!this.cityListForSelect.find(item => item.label === row[this.column])) {
                    this.cityListForSelect.push({label: row[this.column]});
                }
            });
        });
    }

    get tableData() {
        return this._tableData;
    }

    ngOnDestroy() {
        this._removeRefreshCallback && this._removeRefreshCallback();
    }
}

