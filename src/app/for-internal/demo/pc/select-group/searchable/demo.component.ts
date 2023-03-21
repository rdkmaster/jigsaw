import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class SelectGroupSearchableDemoComponent {
    cityList = new ArrayCollection([{
        groupName: "城市",
        data: [{ label: "北京" },
        { label: "上海" },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙" },
        { label: "西安" }]
    }, {
        groupName: "国家",
        data: [{ label: "中国" },
        { label: "韩国" },
        { label: "日本" },
        { label: "俄罗斯" },
        { label: "英国" },
        { label: "法国" }]
    }]);

    valid: false;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
