import { EventEmitter } from "@angular/core";
import {darkGraphTheme, lightGraphTheme} from "./echarts-theme";

export type SupportedTheme = 'paletx-pro' | 'vmax-pro';
export type MajorStyle = "dark" | "light";
export type PopupBackgroundColor = "#1b1d26" | "#ffffff";

declare const document;

export type ThemeProperty = {name: string, value: string};
export type ThemeInfo = {usingTheme: string, majorStyle: string};

// @dynamic
export class JigsawTheme {
    private static _popupBackgroundColor: PopupBackgroundColor = "#ffffff";
    private static _majorStyle: MajorStyle = null;
    private static _usingTheme: SupportedTheme;

    public static changeTheme(theme: SupportedTheme, majorStyle?: MajorStyle) {
        majorStyle = majorStyle || this.majorStyle;
        if (majorStyle != this.majorStyle) {
            this.majorStyle = majorStyle;
        }
        this._usingTheme = theme;

        const head = document.getElementsByTagName("head")[0];
        const linkId = 'jigsaw-theme';
        const themeLink = document.getElementById(linkId) as HTMLLinkElement;
        const cssHref = `themes/${theme}-${majorStyle}.css`;
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

        style.onload = () => {
            this._themeProperties.splice(0, this._themeProperties.length);
            this._readThemeProperties();
            this.themeChange.emit({ usingTheme: this._usingTheme, majorStyle: this._majorStyle });
            style.onload = null;
        };
    }

    public static get majorStyle(): MajorStyle {
        return this._majorStyle;
    }

    public static set majorStyle(value: MajorStyle) {
        this._majorStyle = value;

        switch (value) {
            case "dark":
                this._popupBackgroundColor = "#1b1d26";
                break;
            case 'light':
            default:
                this._popupBackgroundColor = "#ffffff";
        }
    }

    public static getPopupBackgroundColor(): PopupBackgroundColor {
        return this._popupBackgroundColor;
    }

    public static getGraphTheme(theme?: 'light' | 'dark' | string): any {
        if (theme) {
            return theme == 'dark' ? darkGraphTheme : lightGraphTheme;
        }
        return this._popupBackgroundColor == "#ffffff" ? lightGraphTheme : darkGraphTheme;
    }

    private static _themeProperties: ThemeProperty[] = [];

    private static _readThemeProperties(): void {
        const styleSheet = [...document.styleSheets].find(styleSheet => styleSheet.ownerNode.id === "jigsaw-theme");
        if (!styleSheet) {
            return;
        }
        const styleRules = [...styleSheet.cssRules].filter(rule => rule.type === 1 && rule.selectorText === ":root");
        styleRules.forEach(styleRule => {
            const propName = [...styleRule.style];
            const properties = propName.map(propName => ({name: propName.trim(), value: styleRule.style.getPropertyValue(propName).trim()}));
            this._themeProperties.push(...properties);
        });
    }

    public static getProperty(prop: string): string {
        const data = this._themeProperties.find(p => p.name == prop);
        return data?.value;
    }

    public static getProperties(): ThemeProperty[] {
        return [...this._themeProperties];
    }

    public static themeChange = new EventEmitter<ThemeInfo>();
}
