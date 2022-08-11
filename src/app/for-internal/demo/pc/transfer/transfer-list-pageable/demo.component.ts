import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ArrayCollection, TableData, TransferListSourceRenderer, TransferListDestRenderer, PageableArray, CommonUtils } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TransferListPageableDemoComponent {
    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    public labelField = 'zhName';
    public subLabelField = 'enName';
    public trackItemBy = 'shortName';

    constructor(public http: HttpClient) {
        this.data = new PageableArray(http, {
            url: 'mock-data/countries',
            // 在这个例子中不需要带参数，但是为了演示如何带参数给服务端，
            // 这里还是随便给了一些参数，可以在浏览器的network页中看效果
            params: { someData: 'this param is not necessary in this example.' },
        });
        this.data.fromAjax();

        this.selectedData = new ArrayCollection();
        this.selectedData.http = http;
        this.selectedData.fromAjax('mock-data/countries');
        this.selectedData.dataReviser = (td: TableData) => TableData.toArray(td).slice(10, 15);
    }

    data: PageableArray;
    selectedData: ArrayCollection<any>;

    selectedItemsChange($event) {
        console.log($event)
    }

    changeData() {
        this.data.fromAjax();
        this.data.dataReviser = (td: TableData) => {
            td = <TableData>CommonUtils.deepCopy(td);
            td.data.forEach((row, idx) => {
                row[0] = idx % 2 == 0 ? row[0] + '-1' : row[0];
            });
            return td;
        }
    }

    resetInputData() {
        this.data.fromAjax('mock-data/countries');
        this.data.dataReviser = null;
    }

    resetSelectedData() {
        this.selectedData.fromAjax('mock-data/countries');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
