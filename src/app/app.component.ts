import {Component, ViewEncapsulation} from "@angular/core";
import {TreeData} from "../jigsaw/core/data/tree-data";

@Component({
    selector: 'app-root',
    template: `
        <jigsaw-root>
            <div class="app-wrap">
                <j-breadcrumb [routes]="routes" separator=">"></j-breadcrumb>
                <router-outlet></router-outlet>
            </div>
        </jigsaw-root>
    `,
    styleUrls: ['./live-demo-wrapper.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    constructor() {
        this.routes = new TreeData();
        this.routes.fromObject([
            {
                label: '提示框',
                route: 'alert',
                nodes: [
                    {
                        label: '弹出',
                        route: 'popup'
                    },
                    {
                        label: '在文档里',
                        route: 'in-dom'
                    },
                    {
                        label: '自定义',
                        route: 'customized'
                    }
                ]
            },
            {
                label: '面包屑',
                route: 'breadcrumb',
                nodes: [
                    {
                        label: '基本用法',
                        route: 'basic',
                    },
                    {
                        label: '路由',
                        route: 'router'
                    }
                ]
            }
        ]);
    }

    routes: TreeData;
}
