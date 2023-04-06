import { Component, Renderer2, ViewChild } from "@angular/core";
import { InfiniteScrollLocalPageableArray, SortAs, SortOrder } from "jigsaw/public_api";
import { PerfectScrollbarDirective } from "ngx-perfect-scrollbar";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"],
})
export class InfiniteScrollLocalPageableArrayDemoComponent {
    public lpsa: InfiniteScrollLocalPageableArray<any>;
    public searchGroup = false;
    public sortOrders = [{ id: 1, label: "正序" }, { id: 2, label: "倒序" }];
    public selectedsortOrder = { id: 1, label: "正序" };

    @ViewChild("contentScrollbar", { read: PerfectScrollbarDirective })
    public contentScrollbar: PerfectScrollbarDirective;

    constructor(private _renderer: Renderer2) {
        this._$resetData();
    }

    public _$handleSearching(filterKey?: string) {
        filterKey = filterKey ? filterKey.trim() : "";
        if (this.searchGroup) {
            this.lpsa.filter(filterKey, ["label", "groupName"]);
        } else {
            this.lpsa.filter(filterKey, ["label"]);
        }
        this.contentScrollbar.scrollToTop(0, 1);
    }

    public _$handleSort() {
        const sortOrder = this.selectedsortOrder.id == 1 ? SortOrder.asc : SortOrder.desc;
        this.lpsa.sort(SortAs.string, sortOrder, 'label');
        this.contentScrollbar.scrollToTop(0, 1);
    }
    
    public _$changeData() {
        let array = [];
        for (let i = 1; i <= 100; i++) {
            let groupName = "其他分组";
            array.push({ label: "改变数据源选项" + i, groupName: groupName });
        }
        this.lpsa.fromArray(array);
        this.contentScrollbar.scrollToTop(0, 1);
    }
    
    public _$resetData() {
        let array = [];
        for (let i = 1; i <= 1000; i++) {
            let groupName = "其他分组";
            if (i < 20) {
                groupName = "分组1";
            } else if (i < 50) {
                groupName = "分组2";
            } else if (i < 150) {
                groupName = "分组3";
            }
            array.push({ label: "测试选项" + i, groupName: groupName });
        }
        this.lpsa = new InfiniteScrollLocalPageableArray();
        this.lpsa.fromArray(array);
        this.lpsa.pagingInfo.pageSize = 15;
        if (this.contentScrollbar) {
            this.contentScrollbar.scrollToTop(0, 1);
        }
    }

    ngAfterViewInit() {
        const el = this.contentScrollbar.elementRef.nativeElement;
        this._renderer.listen(el, "ps-y-reach-end", ($event) => {
            if ($event.target.scrollTop == 0) {
                return;
            }
            if (
                this.lpsa.pagingInfo.currentPage ==
                this.lpsa.pagingInfo.totalPage
            ) {
                return;
            }
            console.log($event);
            this.lpsa.nextPage();
        });
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
