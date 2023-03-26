import { Component, Renderer2, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PageableSelectArray } from "jigsaw/public_api";
import { PerfectScrollbarDirective } from "ngx-perfect-scrollbar";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"],
})
export class PageableSelectArrayDemoComponent {
    public psa: PageableSelectArray;
    public ready = false;
    public searchGroup = false;

    @ViewChild("contentScrollbar", { read: PerfectScrollbarDirective })
    public contentScrollbar: PerfectScrollbarDirective;

    constructor(http: HttpClient, private _renderer: Renderer2) {
        this.psa = new PageableSelectArray(http, {
            url: "mock-data/countries",
            params: { aa: 11, bb: 22 },
        });
        this.psa.onAjaxSuccess(this.onAjaxSuccess, this);
        this.psa.onAjaxError(this.onAjaxError, this);
        this.psa.pagingInfo.pageSize = 20;
        this.psa.fromAjax();
    }

    keyword: string;
    regExp: string;

    regExpFilter() {
        // 这里需要特别注意，filter函数的执行是在服务端，而非在浏览器！
        // 这里context变量是filter的执行上下文（即filter函数里的this所指向的对象），它将会一起传输给服务端，
        // 因此这里需要注意控制context的值里只包含有用的数据，以加快前后端通信速度
        const filter = function (item) {
            return item[0].match(new RegExp(this.reg, "g"));
        };
        const context = { reg: this.regExp };
        this.psa.filter(filter, context);
    }

    onAjaxSuccess(data): void {
        this.ready = true;
    }

    onAjaxError(err): void {
        this.ready = false;
    }

    start() {
        this.psa.fromAjax();
    }

    previousPage() {
        this.psa.previousPage();
    }

    nextPage() {
        this.psa.nextPage();
    }

    public _$handleSearching(filterKey?: string) {
        filterKey = filterKey ? filterKey.trim() : "";
        if (this.searchGroup) {
            this.psa.filter(filterKey, ["zhName", "groupName"]);
        } else {
            this.psa.filter(filterKey);
        }
        this.contentScrollbar.scrollToTop(0, 1);
    }

    ngAfterViewInit() {
        const el = this.contentScrollbar.elementRef.nativeElement;
        this._renderer.listen(el, "ps-y-reach-end", ($event) => {
            if ($event.target.scrollTop == 0) {
                return;
            }
            if (
                this.psa.pagingInfo.currentPage == this.psa.pagingInfo.totalPage
            ) {
                return;
            }
            console.log($event);
            this.psa.nextPage();
        });
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
