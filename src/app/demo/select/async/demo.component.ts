import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html',
})
export class SelectAsyncComponent {
    constructor(public http: HttpClient) {
        this.citys = new ArrayCollection();
        this.citys.http = http;
        this.citys.fromAjax('mock-data/cities');
        this.citys.onAjaxComplete(() => {
            console.log(this.citys);
        });
    }

    citys: ArrayCollection<any>;
    selectedCity: any;
    selectedCityName: string;

    selectChange(selectedItem: any) {
        this.selectedCityName = selectedItem.name;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawSelect',
    ];
}

