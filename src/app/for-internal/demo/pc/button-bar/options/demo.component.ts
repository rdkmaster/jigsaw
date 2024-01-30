import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class ButtonBarOptionsDemoComponent {
    public selectedItems: any[];
    public data = new ArrayCollection([
        { label: "北京", id: 1, title: "首都" },
        { label: "上海-一个很长的地址", id: 2, title: "直辖市" },
        { label: "南京", id: 3, title: "省会" },
        { label: "深圳", id: 4 },
        { label: "长沙", id: 5 },
        { label: "西安", id: 6 }
    ]);

    public optionWidth = 80;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
