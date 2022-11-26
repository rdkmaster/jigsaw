import { Output } from "@angular/core";
import { JigsawTheme } from "jigsaw/public_api";
import { EventEmitter } from "@angular/core";

export class ThemeService {
    public changeTheme(themeName, majorStyle) {
        JigsawTheme.changeTheme(themeName, majorStyle);
        
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

        this.themeChange.emit(JigsawTheme);
    }

    @Output()
    public themeChange: EventEmitter<JigsawTheme> = new EventEmitter<JigsawTheme>();
}