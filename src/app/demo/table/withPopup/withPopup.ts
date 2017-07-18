import {Component} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {Http} from "@angular/http";
import {PopupService, PopupDisposer, PopupInfo} from "jigsaw/service/popup.service";


@Component({
  templateUrl: 'withPopup.html',
    styleUrls : ['withPopup.scss']
})

export class TableDataWithPopupDemoComponent {

     _popupInfo: PopupInfo;
     _disposer: PopupDisposer;

    tableData: TableData;
    constructor(http: Http,private _popupService: PopupService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }
    popupTemplate(tp){
        this._popupInfo = this._popupService.popup(tp);
        this._disposer = () => {this._popupInfo.dispose()}
    }

}

