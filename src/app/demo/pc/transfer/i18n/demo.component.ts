import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {ArrayCollection, LocalPageableArray, TableData, TransferListSourceRenderer, TransferListDestRenderer, TranslateHelper} from "jigsaw/public_api";
import {TransferTextService} from "../text.service";

@Component({
    selector: 'i18n-transfer',
    templateUrl: './demo.component.html'
})
export class TransferArrayI18nDemoComponent {
    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;
    public labelField = 'zhName';
    public subLabelField = 'shortName'
    public trackItemBy = 'zhName';


    constructor(private _http: HttpClient,private _translateService:TranslateService, public text: TransferTextService) {
        this.data = new ArrayCollection();
        this.data.http = _http;
        this.data.fromAjax('mock-data/countries');
        this.data.dataReviser = (td: TableData) => TableData.toArray(td);

        this.selectedCountries = new ArrayCollection();
        this.selectedCountries.http = _http;
        this.selectedCountries.fromAjax('mock-data/countries');
        this.selectedCountries.dataReviser = (td: TableData) => TableData.toArray(td).slice(0,5);

        this.data_page = new LocalPageableArray();
        this.data_page.http = _http;
        this.data_page.pagingInfo.pageSize = 15;
        this.data_page.fromAjax('mock-data/countries');
        this.data_page.dataReviser = (td: TableData) => TableData.toArray(td);

        this.selectedCountries = new ArrayCollection();
        this.selectedCountries.http = _http;
        this.selectedCountries.fromAjax('mock-data/countries');
        this.selectedCountries.dataReviser = (td: TableData) => TableData.toArray(td).slice(0,5);
    }

    data: ArrayCollection<any>;
    data_page: LocalPageableArray<any>;
    selectedCountries: ArrayCollection<any>;
    selectedCountriesStr: string;
    lang ;

    handleSelectChange($event) {
        this.selectedCountriesStr = $event.map(item => item.zhName).join(',');
    }

    changeLang(lang: string) {
        TranslateHelper.changeLanguage(this._translateService, lang);
    }
}
