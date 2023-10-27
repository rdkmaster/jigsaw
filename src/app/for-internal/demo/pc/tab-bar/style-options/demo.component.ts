import { Component, OnInit } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./../../assets/demo.common.css"]
})
export class TabBarStyleOptionsDemoComponent implements OnInit {
    public tabBarData: Array<string>;

    ngOnInit() {
        const data = [];
        for (let i = 1; i < 12; i++) {
            let item: any = `Tab ${i}`;
            if (i == 3 || i == 5) {
                item = `<div><span class="iconfont iconfont-e187"></span>Tab ${i}</div>`;
            }
            if (i == 7 || i == 9) {
                item = `${i}`;
            }
            if (i == 4 || i == 11) {
                item = { label: `Tab ${i}`, disabled: true }
            }
            data.push(item)
        }
        this.tabBarData = data;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
