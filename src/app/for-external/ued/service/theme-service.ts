import { Output, Injectable } from "@angular/core";
import {JigsawThemeService} from "jigsaw/public_api";
import { EventEmitter } from "@angular/core";

@Injectable()
export class ThemeService {
    constructor(public service: JigsawThemeService) {
    }

    public changeTheme(themeName, majorStyle) {
        this.service.changeTheme(themeName, majorStyle);

        const head = document.getElementsByTagName("head")[0];
        const linkId = 'prism-theme';
        const themeLink = document.getElementById(linkId) as HTMLLinkElement;
        const cssHref = `themes/prism-${majorStyle}.css`;
        if (themeLink && themeLink.href.endsWith(cssHref)) {
            return;
        }

        if (themeLink) {
            head.removeChild(themeLink);
        }
        const style = document.createElement("link");
        style.id = linkId;
        style.rel = "stylesheet";
        style.href = cssHref;
        head.appendChild(style);

        this.themeChange.emit(this.service);
    }

    @Output()
    public themeChange: EventEmitter<JigsawThemeService> = new EventEmitter<JigsawThemeService>();
}
