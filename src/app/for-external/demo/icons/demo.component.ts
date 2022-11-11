import { Component, OnInit } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

const iconfontInfo = require('./iconfont.json');

@Component({
    templateUrl: './demo.component.html',
})
export class IconsDemoComponent extends DemoSetBase implements OnInit {
    public demoPath = "demo/icons";

    public iconGroup = [];
    public iconData = [];

    public _$currentGroupIndex: number = -1;

    public _$clickGroupTag(i){
        console.log(i)
    }

    ngOnInit() {
        // const iframe = document.getElementById('iframe');
        // const iframeDoc = iframe['contentDocument'] || iframe['contentWindow'].document;
        // const source = require('!!raw-loader!@rdkmaster/icon-font/iconfont.html').default;
        // iframeDoc.write(source);
        this.iconGroup = iconfontInfo.group;
        this.iconData = iconfontInfo.icons;
        console.log(this.iconGroup);
        console.log(this.iconData)
    }
}
