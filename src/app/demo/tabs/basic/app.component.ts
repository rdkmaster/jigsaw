/**
 * Created by 10177553 on 2017/3/29.
 */
import {
	Component, Renderer2, ViewContainerRef
} from '@angular/core';
import {TableData} from "jigsaw/core/data/table-data";

@Component({
    templateUrl: './app.component.html',
    styleUrls:['./app.component.scss']
})
export class JigsawTabsDemoComponent {
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
        ["Name", "Price", "Description", "Origin"]);

    testEvent(value) {
        console.info(value);
    }

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
}
