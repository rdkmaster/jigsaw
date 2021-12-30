import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CustomizeAlertDemoComponent {
    public testDark() {
        const linkId = 'alertDarkTheme';
        const themeLink = document.getElementById(linkId) as HTMLLinkElement;
        if (themeLink) {
            return;
        }
        const head = document.getElementsByTagName("head")[0];
        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.id = linkId;
        style.href = "themes/components/alert-dark.css";;
        head.appendChild(style);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '使用`JigsawAlert`组件自定义一个对话框';
    description: string = '';
}
