import {Component} from "@angular/core";
import {GroupOptionValue} from "jigsaw/public_api";
import {ListLiteTextService} from "../doc.service";

@Component({
    selector: 'list-lite-with-icon',
    templateUrl: './demo.component.html'
})
export class ListLiteWithIconDemoComponent {
    withIcon: GroupOptionValue[] = [
        {
            icon: 'iconfont iconfont-e187',
            name: 'bicycle',
            suffixIcon: 'iconfont iconfont-ea03'
        },
        {
            icon: 'iconfont iconfont-e12e',
            name: 'camera',
            suffixIcon: 'iconfont iconfont-ea03'
        },
        {
            icon: 'iconfont iconfont-e0bc',
            name: 'car',
            suffixIcon: 'iconfont iconfont-ea03'
        },
        {
            icon: 'iconfont iconfont-e534',
            name: 'football',
            suffixIcon: 'iconfont iconfont-ea03'
        },
        {
            icon: 'iconfont iconfont-e565',
            name: 'book',
            suffixIcon: 'iconfont iconfont-ea03'
        },
        {
            icon: 'iconfont iconfont-ea1e',
            name: 'puzzle-piece',
            suffixIcon: 'iconfont iconfont-ea03'
        },
    ];

    constructor(public text: ListLiteTextService) {
    }
}
