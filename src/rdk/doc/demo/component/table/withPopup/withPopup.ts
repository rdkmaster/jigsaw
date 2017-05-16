import {Component} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {Http} from "@angular/http";
import {PopupService, PopupRef, PopupDisposer, PopupInfo} from "../../../../../service/popup.service";


@Component({
  templateUrl: 'withPopup.html',
    styleUrls : ['withPopup.scss']
})

export class TableDataWithPopupDemoComponent {

    private _popupInfo: PopupInfo;
    private _disposer: PopupDisposer;

    tableData: TableData;
    constructor(http: Http,private _popupService: PopupService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }
    popupTemplate(tp){
        this._popupInfo = this._popupService.popup(tp);
        this._disposer = () => {this._popupInfo.disposer()}
    }

}

