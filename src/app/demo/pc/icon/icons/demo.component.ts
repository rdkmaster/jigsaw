import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class IconIconsDemoComponent implements OnInit {

    ngOnInit() {
        const iframe = document.getElementById('iframe');
        const iframeDoc = iframe['contentDocument'] || iframe['contentWindow'].document;
        const source = require('!!raw-loader!../../../../../../node_modules/@rdkmaster/icon-font/iconfont.html').default;
        iframeDoc.write(source);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo列举了所有icon-font图标，可以直接使用，Jigsaw已经不建议使用FontAwesome图标了，建议全部改用Jigsaw内置的图标';
    description: string = '';
}
