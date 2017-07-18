import { Component } from "@angular/core";

@Component({
  templateUrl: 'demo.html'
})
export class PaginationBasicDemoComponent {
    currentPage: number = 1;

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

