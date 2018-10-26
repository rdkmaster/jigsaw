import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection, LocalPageableArray} from "../../../../jigsaw/core/data/array-collection";
import {TableData} from "../../../../jigsaw/core/data/table-data";
import {Local} from "protractor/built/driverProviders";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
    `]
})
export class TransferDemoComponent {
    constructor(private _http: HttpClient) {
        this.data1 = new ArrayCollection();
        this.data1.http = _http;
        this.data1.fromAjax('mock-data/countries');
        this.data1.dataReviser = (td: TableData) => TableData.toArray(td);

        this.data2 = new LocalPageableArray();
        this.data2.http = _http;
        this.data2.fromAjax('mock-data/countries');
        this.data2.dataReviser = (td: TableData) => TableData.toArray(td);
    }

    data1: ArrayCollection<any>;
    data2: LocalPageableArray<any>;

    selectedCountries1: string;
    selectedCountries2: string;

    handleSelectChange($event, index) {
        this[`selectedCountries${index}`] = $event.map(item => item.zhName).join(',');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';

}

