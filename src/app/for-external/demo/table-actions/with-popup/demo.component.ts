import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData, PopupDisposer, PopupInfo, PopupService } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'table-with-popup',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TableDataWithPopupDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-actions/with-popup";

    public popupInfo: PopupInfo;
    public disposer: PopupDisposer;
    public tableData: TableData;

    public popupTemplate(tp) {
        this.popupInfo = this._popupService.popup(tp);
        this.disposer = () => {
            this.popupInfo.dispose()
        }
    }

    constructor(private _popupService: PopupService, http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}
