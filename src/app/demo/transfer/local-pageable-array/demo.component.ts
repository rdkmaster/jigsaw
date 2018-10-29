import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection, LocalPageableArray} from "jigsaw/core/data/array-collection";
import {TableData} from "jigsaw/core/data/table-data";

@Component({
    templateUrl: './demo.component.html'
})
export class TransferLocalPageableArrayComponent {
    constructor(private _http: HttpClient) {
        this.data = new LocalPageableArray();
        this.data.http = _http;
        this.data.fromAjax('mock-data/countries');
        this.data.dataReviser = (td: TableData) => TableData.toArray(td);

        this.selectedCountries = new ArrayCollection();
        this.selectedCountries.http = _http;
        this.selectedCountries.fromAjax('mock-data/countries');
        this.selectedCountries.dataReviser = (td: TableData) => TableData.toArray(td).slice(0,5);
    }

    data: LocalPageableArray<any>;
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

