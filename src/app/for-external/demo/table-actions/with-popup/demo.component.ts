import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData, PopupDisposer, PopupInfo, PopupService } from "jigsaw/public_api";
import { TableActionsTextService } from "../doc.service";

@Component({
    selector: 'table-with-popup',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})

export class TableDataWithPopupDemoComponent {
    public popupInfo: PopupInfo;
    public disposer: PopupDisposer;
    public tableData: TableData;

    public popupTemplate(tp) {
        this.popupInfo = this._popupService.popup(tp);
        this.disposer = () => {
            this.popupInfo.dispose()
        }
    }

    constructor(private _popupService: PopupService,
        http: HttpClient, public doc: TableActionsTextService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}
