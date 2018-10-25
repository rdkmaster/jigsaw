import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class PaginationBasicDemoComponent {
    currentPage: number = 1;
    currentPageForSimple: number = 1;

    getCurrentPage(message: any) {
        console.log("current page is: " + message);
    }

    getPageSize(message: any) {
        console.log("page size is: " + message);
    }

    changeCurrentPage(number) {
        this.currentPage = number;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawPagination'
    ];
}

