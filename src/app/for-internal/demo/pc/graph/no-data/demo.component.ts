import {Component} from '@angular/core';
import {AbstractGraphData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})

export class GraphWithNoDataComponent {
    data: AbstractGraphData;

    public noDataImgSrc = "/app/for-internal/demo/pc/table/no-data/assets/default-light.png";
    public noDataDarkImgSrc = "/app/for-internal/demo/pc/table/no-data/assets/default-dark.png";
    public noDataPrompt = "自定义的空数据文本";

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
