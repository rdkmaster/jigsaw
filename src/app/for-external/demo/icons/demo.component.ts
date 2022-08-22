import {Component, OnInit} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
})
export class IconsDemoComponent implements OnInit {

    ngOnInit() {
        const iframe = document.getElementById('iframe');
        const iframeDoc = iframe['contentDocument'] || iframe['contentWindow'].document;
        const source = require('!!raw-loader!@rdkmaster/icon-font/iconfont.html').default;
        iframeDoc.write(source);
    }
}
