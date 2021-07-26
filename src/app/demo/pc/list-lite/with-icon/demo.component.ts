import {Component} from "@angular/core";
import {GroupOptionValue} from "jigsaw/public_api";

@Component({
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
