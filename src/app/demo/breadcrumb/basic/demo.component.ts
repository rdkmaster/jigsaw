import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .last {
            color: #666666;
        }
    `]
})
export class BreadcrumbBasicDemoComponent {
    breadcrumbItems: any[];

    constructor() {
        this.resetBreadcrumbItems();
    }

    onClick(item) {
        const idx = this.breadcrumbItems.indexOf(item);
        this.breadcrumbItems.splice(idx + 1, this.breadcrumbItems.length - idx);
    }

    resetBreadcrumbItems() {
        this.breadcrumbItems = [
            {id: 0, label: 'Home', icon: 'fa fa-home'},
            {id: 1, label: 'Digital', icon: 'fa fa-camera'},
            {id: 2, label: 'List', icon: 'fa fa-list'},
            {id: 3, label: 'Detail', icon: 'fa fa-shopping-cart'},
        ];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '高定制性的面包屑，理论上可以完成任何导航场景，代价是需要自行控制，' +
        '参考<a href="/breadcrumb/router">这个demo</a>使用自动控制的面包屑。';
    description: string = '';
}

