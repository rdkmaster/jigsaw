/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/common/core/data/table-data";
import {LineGraphData} from "jigsaw/common/core/data/graph-data";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class JigsawMobileTabsDemoComponent {
    fruitList: TableData = new TableData(
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

    testEvent(value) {
        console.info(value);
    }

    selectedIndexChange($event) {
        console.log($event);
    }

    public lineBarGraphData: LineGraphData;

    constructor(http: HttpClient) {
        this.lineBarGraphData = new LineGraphData();
        this.lineBarGraphData.http = http;
        this.lineBarGraphData.fromAjax('mock-data/marketing');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '此demo主要描述tab的加载机制';
    description: string = require('!!raw-loader!./readme.md');
    tags: string[] = [
        'JigsawMobileTab.selectedIndex',
        'JigsawMobileTab.selectChange',
        'JigsawMobileTabPane.lazy',
        'JigsawMobileTabPane.title',
        'JigsawMobileTabPane.disabled',
    ];
}
