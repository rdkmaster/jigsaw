import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection, LocalPageableArray} from "../../../../jigsaw/core/data/array-collection";
import {TableData} from "../../../../jigsaw/core/data/table-data";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
    `]
})
export class TransferDemoComponent {
    constructor(private _http: HttpClient) {
        this.data = new LocalPageableArray();
        this.data.http = _http;
        this.data.fromAjax('mock-data/countries');
        this.data.dataReviser = (td: TableData) => TableData.toArray(td);
    }

    data;
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';

}

