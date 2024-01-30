import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class ListOptionsDemoComponent {
    public data;
    public selectedItems;
    public disabled = false;
    public multipleSelect = true;
    public valid = true;
    public maxSelectedItemsLimit = 2;
    public maxOptionsReached;

    constructor() {
        this.resetData();
    }

    public selectedItemsChange($event) {
        console.log($event);
    }

    public resetData() {
        this.selectedItems = new ArrayCollection([]);
        this.data = new ArrayCollection([
            { "label": "北京" },
            { "label": "上海" },
            { "label": "南京" },
            { "label": "深圳" },
            { "label": "长沙" },
            { "label": "西安" },
            { "label": "纽约" },
            { "label": "伦敦" },
            { "label": "东京" },
            { "label": "巴黎" },
            { "label": "柏林" },
            { "label": "悉尼" },
            { "label": "莫斯科" },
            { "label": "迪拜" },
            { "label": "新德里" },
            { "label": "多伦多" },
            { "label": "京都" },
            { "label": "马德里" },
            { "label": "温哥华" },
            { "label": "里约热内卢" },
            { "label": "开罗" },
            { "label": "圣保罗" },
            { "label": "曼谷" },
            { "label": "雅加达" },
            { "label": "孟买" },
            { "label": "墨西哥城" },
            { "label": "雪梨" },
            { "label": "香港" },
            { "label": "洛杉矶" },
            { "label": "罗马" },
            { "label": "阿姆斯特丹" },
            { "label": "首尔" },
            { "label": "伊斯兰堡" },
            { "label": "新加坡" },
            { "label": "伊斯坦布尔" },
            { "label": "布宜诺斯艾利斯" },
            { "label": "卡拉奇" },
            { "label": "吉隆坡" },
            { "label": "雅典" },
            { "label": "奥斯陆" },
            { "label": "渥太华" },
            { "label": "华盛顿" },
            { "label": "迈阿密" }
        ]);
    }

    public changeData() {
        this.selectedItems = new ArrayCollection([]);
        this.data = new ArrayCollection([
            { "label": "北京" },
            { "label": "上海" },
            { "label": "南京" },
            { "label": "深圳" },
            { "label": "长沙" },
            { "label": "西安" },
        ]);
    }

    public clearValue() {
        this.selectedItems = new ArrayCollection([]);
    }

    public setValue() {
        this.selectedItems = new ArrayCollection([
            { "label": "北京" },
            { "label": "上海" },
            { "label": "南京" },
            { "label": "深圳" },
            { "label": "长沙" }
        ])
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
