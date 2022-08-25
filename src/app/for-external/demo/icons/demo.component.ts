import {Component, OnInit} from "@angular/core";
import {AsyncDescription} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class IconsDemoComponent extends AsyncDescription implements OnInit {
    public demoPath = "demo/icons";

    ngOnInit() {
        const iframe = document.getElementById('iframe');
        const iframeDoc = iframe['contentDocument'] || iframe['contentWindow'].document;
        const source = require('!!raw-loader!@rdkmaster/icon-font/iconfont.html').default;
        iframeDoc.write(source);
    }
}
