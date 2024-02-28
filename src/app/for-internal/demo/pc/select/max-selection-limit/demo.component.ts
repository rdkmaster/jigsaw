import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class SelectMaxSelectionLimitDemoComponent {
    public data;
    public value;
    public maxSelectionLimit = 3;

    constructor(public http: HttpClient) {
        this.data = new ArrayCollection([
            { "label": "北京" },
            { "label": "上海" },
            { "label": "南京" },
            { "label": "深圳" },
            { "label": "长沙" },
            { "label": "西安" },
            { "label": "纽约" },
            { "label": "伦敦" },
            { "label": "东京" },
            { "label": "巴黎" },
            { "label": "柏林" }
        ]);
    }

    public valueChange($event) {
        console.log('valueChange ===>', $event);
    }

    public maxSelectionReachedChange($event) {
        console.log('maxSelectionReachedChange ===>', $event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
