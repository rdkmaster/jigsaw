import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection, PageableArray} from "jigsaw/common/core/data/array-collection";
import {TableData} from "jigsaw/common/core/data/table-data";

@Component({
    templateUrl: './demo.component.html'
})
export class TransferPageableArrayComponent {
    constructor(private _http: HttpClient) {
        this.data = new PageableArray(_http, 'mock-data/countries');
        this.data.fromAjax();

        this.selectedCountries = new ArrayCollection();
        this.selectedCountries.http = _http;
        this.selectedCountries.fromAjax('mock-data/countries');
        this.selectedCountries.dataReviser = (td: TableData) => TableData.toArray(td).slice(10,15);
    }

    data: PageableArray;
    selectedCountries:  ArrayCollection<any>;
    selectedCountriesStr: string;

    handleSelectChange($event) {
        this.selectedCountriesStr = $event.map(item => item.zhName).join(',');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

