import {Component, ElementRef} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ArrayCollection, TableData, LineGraphData } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'tab-headless',
    templateUrl: './demo.component.html'
})
export class TabHeadlessDemoComponent extends AsyncDescription {
    public demoPath = "demo/tab/headless";

    public headless: boolean = true;
    public lineBarGraphData: LineGraphData;
    public selectedIndex = 0;

    public tabs = new ArrayCollection([
        { label: "Tab 1", idx: 0 },
        { label: "Tab 2", idx: 1 },
        { label: "Tab 3", idx: 2 },
        { label: "Tab 4", idx: 3 }
    ]);

    public fruitList: TableData = new TableData(
        [
            ["banana", "$12.0", "The banana is an edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa.", "Southeast Asia"],
            ["apple", "$21.0", "The apple tree is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple.", "Shan Dong, China"],
            ["strawberry", "$31.0", "The garden strawberry is a widely grown hybrid species of the genus Fragaria, collectively known as the strawberries. It is cultivated worldwide for its fruit.", "Southeast Asia"],
            ["watermelon", "$13.0", "Watermelon Citrullus lanatus var. lanatus is a scrambling and trailing vine in the flowering plant family Cucurbitaceae.", "Southeast Asia"],
            ["pineapple", "$33.0", "The pineapple is a tropical plant with an edible multiple fruit consisting of coalesced berries, also called pineapples.", "Southeast Asia"],
            ["pear", "$11.0", "The pear is any of several tree and shrub species of genus Pyrus, in the family Rosaceae. It is also the name of the pomaceous fruit of the trees. ", "Southeast Asia"],
        ],
        ["name", "price", "desc", "origin"],
        ["Name", "Price", "Description", "Origin"]
    );

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.lineBarGraphData = new LineGraphData();
        this.lineBarGraphData.http = http;
        this.lineBarGraphData.fromAjax('mock-data/marketing');
    }
}
