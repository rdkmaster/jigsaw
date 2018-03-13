import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {PopupDisposer, PopupInfo, PopupService} from "jigsaw/service/popup.service";


@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})

export class TableDataWithPopupDemoComponent {
    popupInfo: PopupInfo;
    disposer: PopupDisposer;
    tableData: TableData;

    constructor(private _popupService: PopupService,
                http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    popupTemplate(tp) {
        this.popupInfo = this._popupService.popup(tp);
        this.disposer = () => {
            this.popupInfo.dispose()
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'PopupService.popup',
    ];
}

