import {Component, OnInit} from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class IconsDemoComponent extends DemoSetBase implements OnInit {
    public demoPath = "demo/icons";

    ngOnInit() {
        const iframe = document.getElementById('iframe');
        const iframeDoc = iframe['contentDocument'] || iframe['contentWindow'].document;
        const source = require('!!raw-loader!@rdkmaster/icon-font/iconfont.html').default;
        iframeDoc.write(source);
    }
}
