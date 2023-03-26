import { Component, Renderer2, ViewChild } from "@angular/core";
import { LocalPageableSelectArray } from "jigsaw/public_api";
import { PerfectScrollbarDirective } from "ngx-perfect-scrollbar";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"],
})
export class LocalPageableSelectArrayDemoComponent {
    public lpsa: LocalPageableSelectArray<any>;
    public searchGroup = false;

    @ViewChild("contentScrollbar", { read: PerfectScrollbarDirective })
    public contentScrollbar: PerfectScrollbarDirective;

    constructor(private _renderer: Renderer2) {
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
        this.lpsa = new LocalPageableSelectArray();
        this.lpsa.fromArray(array);
        this.lpsa.pagingInfo.pageSize = 15;
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
