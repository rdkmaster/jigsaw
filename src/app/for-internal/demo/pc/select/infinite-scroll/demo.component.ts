import { Component } from "@angular/core";
import { LocalPageableSelectArray } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
})
export class SelectInfiniteScrollDemoComponent {
    public data: LocalPageableSelectArray<any>;
    public value;

    constructor() {
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
        this.data = new LocalPageableSelectArray();
        this.data.fromArray(array);
        this.data.pagingInfo.pageSize = 15;
    }

    public valueChange($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
