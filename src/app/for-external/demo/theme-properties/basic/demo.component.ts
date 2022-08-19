import { Component } from "@angular/core";
import {JigsawTheme, JigsawNotification, ThemeProperty, CommonUtils} from "jigsaw/public_api";
import {ThemePropertiesTextService} from "../doc.service";

@Component({
    selector: "theme-properties-basic",
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class ThemePropertiesBasicDemoComponent {
    public get properties(): ThemeProperty[][] {
        // API给的数据是一个数组，直接平铺出来不好看，这里给归归类
        const classified: { [type: string]: ThemeProperty[] } = {}, types = [], bg = JigsawTheme.getProperty('--bg-active');
        JigsawTheme.getProperties().forEach(prop => {
            let type = prop.name.split('-')[2];
            type = type == 'splitline' ? 'border' : type;
            classified[type] = classified[type] || [];
            const index = classified[type].findIndex(item => {
                return item.name === prop.name
            })
            if (index === -1) {
                classified[type].push(prop);
            } else {
                classified[type][index] = prop;
            }
            (<any>prop).bg = /#\w{6}/.test(prop.value) ? prop.value : bg;
            types.push(type);
        });
        return types.filter((t, idx, arr) => idx == arr.indexOf(t)).map(type => classified[type]);
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

    constructor(public doc: ThemePropertiesTextService) {
    }
}
