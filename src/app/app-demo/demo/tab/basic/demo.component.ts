import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableData, LineGraphData, JigsawProgress} from "jigsaw/public_api";
import {TabTextService} from "../doc.service";

@Component({
    selector: 'tab-basic',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class JigsawTabsDemoComponent implements AfterViewInit {
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

    @ViewChild('progress')
    progress: JigsawProgress;

    ngAfterViewInit() {
        this.startEstimating();
    }

    startEstimating() {
        if (!this.progress) {
            return;
        }
        this.progress.value = 0;
        this.progress.startEstimating(10000, 99.99);
    }

    testEvent(value) {
        console.info(value);
    }

    selectedIndexChange($event) {
        console.log($event);
    }

    public lineBarGraphData: LineGraphData;

    constructor(http: HttpClient, public text: TabTextService) {
        this.lineBarGraphData = new LineGraphData();
        this.lineBarGraphData.http = http;
        this.lineBarGraphData.fromAjax('mock-data/marketing');
    }
}
