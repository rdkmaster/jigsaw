import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection} from "jigsaw/common/core/data/array-collection";
import {TableData} from "jigsaw/common/core/data/table-data";

@Component({
    templateUrl: './demo.component.html'
})
export class TransferItemDisabledDemoComponent {
    constructor(private _http: HttpClient) {
        this.data = new ArrayCollection();
        this.data.http = _http;
        this.data.fromAjax('mock-data/countries');
        this.data.dataReviser = (td: TableData) => {
            return TableData.toArray(td).map(item => {
                item.disabled = Math.random() > 0.8;
                return item;
            })
        }
    }

    data: ArrayCollection<any>;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';

}

