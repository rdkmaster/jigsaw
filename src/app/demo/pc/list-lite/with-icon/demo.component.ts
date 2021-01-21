import {Component} from "@angular/core";
import {GroupOptionValue} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class ListLiteWithIconDemoComponent {
    withIcon: GroupOptionValue[] = [
        {
            icon: 'fa fa-bicycle',
            name: 'bicycle',
            suffixIcon: 'fa fa-search'
        },
        {
            icon: 'fa fa-camera',
            name: 'camera',
            suffixIcon: 'fa fa-search'
        },
        {
            icon: 'fa fa-car',
            name: 'car',
            suffixIcon: 'fa fa-search'
        },
        {
            icon: 'fa fa-futbol-o',
            name: 'football',
            suffixIcon: 'fa fa-search'
        },
        {
            icon: 'fa fa-book',
            name: 'book',
            suffixIcon: 'fa fa-search'
        },
        {
            icon: 'fa fa-puzzle-piece',
            name: 'puzzle-piece',
            suffixIcon: 'fa fa-search'
        },
    ];

    public fixData(useIcon: boolean, useSuffixIcon: boolean): GroupOptionValue[] {
        return this.withIcon.map(item => ({
                name: item.name, icon: useIcon ? item.icon : null,
                suffixIcon: useSuffixIcon ? item.suffixIcon : null
            }
        ));
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '使用`icon`属性来指定一个图标，使用`suffixIcon`属性来指定一个副图标';
    description: string = '';
}
