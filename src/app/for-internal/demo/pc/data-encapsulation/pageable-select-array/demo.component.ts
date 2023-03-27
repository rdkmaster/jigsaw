import { Component, Renderer2, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PageableSelectArray, SortAs, SortOrder } from "jigsaw/public_api";
import { PerfectScrollbarDirective } from "ngx-perfect-scrollbar";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"],
})
export class PageableSelectArrayDemoComponent {
    public psa: PageableSelectArray;
    public searchGroup = false;
    public sortOrders = [{ id: 1, label: "正序" }, { id: 2, label: "倒序" }];
    public selectedsortOrder = { id: 1, label: "正序" };

    @ViewChild("contentScrollbar", { read: PerfectScrollbarDirective })
    public contentScrollbar: PerfectScrollbarDirective;

    constructor(private _http: HttpClient, private _renderer: Renderer2) {
        this._$resetData(_http);
    }

    public _$handleSearching(filterKey?: string) {
        filterKey = filterKey ? filterKey.trim() : "";
        if (this.searchGroup) {
            this.psa.filter(filterKey, ["name", "gender"]);
        } else {
            this.psa.filter(filterKey, ["name"]);
        }
        this.contentScrollbar.scrollToTop(0, 1);
    }

    public _$handleSort() {
        const sortOrder = this.selectedsortOrder.id == 1 ? SortOrder.asc : SortOrder.desc;
        this.psa.sort(SortAs.string, sortOrder, 'name');
        this.contentScrollbar.scrollToTop(0, 1);
    }

    public _$changeData() { }

    public _$resetData(http) {
        this.psa = new PageableSelectArray(http, {
            url: "mock-data/hr-list-full",
            params: { aa: 11, bb: 22 },
        });
        this.psa.onAjaxSuccess(this.onAjaxSuccess, this);
        this.psa.onAjaxError(this.onAjaxError, this);
        this.psa.pagingInfo.pageSize = 20;
        this.psa.fromAjax();
        if (this.contentScrollbar) {
            this.contentScrollbar.scrollToTop(0, 1);
        }
    }

    onAjaxSuccess(data): void {
        // this.ready = true;
    }

    onAjaxError(err): void {
        // this.ready = false;
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
