import { Component, Renderer2, ViewContainerRef } from "@angular/core";

@Component({
  templateUrl: './app.component.html'
})
export class PaginationBasicDemoComponent {
    currentPage: number = 1;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    getCurrentPage(message:any){
        console.log("current page is: "+message);
    }
    getPageSize(message:any){
        console.log("page size is: "+message);
    }
    changeCurrentPage(number){
        this.currentPage = number;
    }
}

