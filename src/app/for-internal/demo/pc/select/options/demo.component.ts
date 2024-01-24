import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class SelectOptionsDemoComponent {
    public data;
    public value;
    public searchable = true;
    public clearable = true;
    public disabled = false;
    public multipleSelect = true;
    public optionCount = 10;
    public maxSelectedItemsLimit = 3;
    public isLocal = true;

    constructor(public http: HttpClient) {
        this._$resetData();
    }

    public valueChange($event) {
        console.log($event);
    }

    public _$changeData() {
        this.value = undefined;
        this.data = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安", "纽约", "伦敦", "东京", "巴黎", "柏林", "悉尼", "莫斯科", "迪拜", "新德里", "多伦多", "京都", "马德里", "温哥华", "里约热内卢", "开罗", "圣保罗", "曼谷", "雅加达", "孟买", "墨西哥城", "雪梨", "香港", "洛杉矶", "罗马", "阿姆斯特丹", "首尔", "伊斯兰堡", "新加坡", "伊斯坦布尔", "布宜诺斯艾利斯", "卡拉奇", "吉隆坡", "雅典", "奥斯陆", "京都", "渥太华", "华盛顿", "雅典", "奥斯陆", "渥太华", "华盛顿", "孟买", "迈阿密", "雅典"]
        );
    }

    public _$resetData() {
        this.value = undefined;
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

    public _$clearValue() {
        this.value = undefined;
    }

    public _$setValue() {
        this.value = new ArrayCollection([
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
