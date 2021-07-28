import { Component } from "@angular/core";
import {JigsawTheme, JigsawNotification, ThemeProperty, CommonUtils} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class ThemePropertiesDemoComponent {
    public get properties(): ThemeProperty[] {
        return JigsawTheme.getProperties();
    }

    public copyToClipboard(text) {
        const el = document.createElement("textarea");
        el.value = text;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        JigsawNotification.show(`${text} 已复制到剪切板`);
    }

    public getFontColor(bg: string): string {
        return CommonUtils.adjustFontColor(bg) == 'light' ? '#000' : '#fff';
    }

    public get codeTagBg(): string {
        return JigsawTheme.getProperty('--blue-2');
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "此DEMO展示了在js中使用皮肤中各个属性的方法，提示：切换不同的皮肤时，这些属性的值会相应变化";
    description: string = "";
}
