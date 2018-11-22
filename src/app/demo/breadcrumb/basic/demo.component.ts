import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
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
    summary: string = '';
    description: string = '';
    tags: string[] = [];
}

