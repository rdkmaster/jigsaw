import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JigsawMenu, LineGraphData, SimpleTreeData, TabBarData, TableData} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ['./demo.component.css']
})
export class JigsawTabBarComponent implements OnInit {
    tabBarData: Array<string>;
    tabBarData2: TabBarData[];
    headless: boolean = true;
    selectedIndex = 0;

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

    lineBarGraphData: LineGraphData;
    menuData: SimpleTreeData;

    constructor(http: HttpClient) {
        this.lineBarGraphData = new LineGraphData();
        this.lineBarGraphData.http = http;
        this.lineBarGraphData.fromAjax('mock-data/marketing');
        this.menuData = new SimpleTreeData();
        this.menuData.fromXML(`
            <node>
                <node label="功能1"></node>
                <node label="功能2"></node>
                <node label="功能3"></node>
                <node label="功能4"></node>
            </node>
        `);
    }

    ngOnInit() {
        this.tabBarData = ["Tab 1", "Tab 2", `<div><span class="fa fa-bicycle"></span>Tab 3</div>`, "Tab 4"];
        this.tabBarData2 = [
            {
                label: "Tab 1",
                icon: 'fa fa-edit'
            },
            {
                label: "Tab 2",
                disabled: true
            },
            {
                html: `<div><span class="fa fa-bicycle"></span>Tab 3</div>`
            },
            {
                html: `
                    <span>更多</span>
                    <span (click)="_$more()" class="tab-icon-more fa fa-ellipsis-v"></span>
                `,
                htmlContext: this
            },
            {
                label: "Tab 5",
                hidden: true
            }
        ];
    }

    public _$more() {
        const mouseEvent: MouseEvent = window.event || arguments[0];
        console.log('more button is clicked: ', mouseEvent);
        JigsawMenu.show(mouseEvent, {data: this.menuData, width: 150}, this.menuSelect.bind(this));
    }

    menuSelect(node: SimpleTreeData) {
        alert(`${node.label} 被点击了!!!`);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = 'Jigsaw的Tab页签可以脱离tab容器，独立出来使用，这个demo演示了这个功能。';
    description: string = '';
}
