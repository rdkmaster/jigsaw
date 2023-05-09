import { EventEmitter } from "@angular/core";
import {darkGraphTheme, lightGraphTheme} from "./echarts-theme";

export type SupportedTheme = "paletx-pro" | "vmax-pro" | "idea" | "masbd" | "zjcm";
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

    private static _loadCss(linkId: string, cssHref: string): HTMLLinkElement {
        const head = document.getElementsByTagName("head")[0];
        const themeLink = document.getElementById(linkId) as HTMLLinkElement;

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
        return style;
    }

    public static changeTheme(theme: SupportedTheme, majorStyle?: MajorStyle) {
        majorStyle = majorStyle || this.majorStyle;
        if (majorStyle != this.majorStyle) {
            this.majorStyle = majorStyle;
        }
        this._usingTheme = theme;

        const style= this._loadCss('jigsaw-theme', `themes/${theme}-${majorStyle}.css`);
        style.onload = () => {
            this._themeProperties.splice(0, this._themeProperties.length);
            this._readThemeProperties();
            this.themeChange.emit({ usingTheme: this._usingTheme, majorStyle: this._majorStyle });
            style.onload = null;
        };
    }

    /**
     * 外部封装皮肤不改变全局的majorStyle，弹框背景、图形基础皮肤、css变量
     * @param theme
     * @param majorStyle
     */
    public static changeOuterTheme(theme: SupportedTheme, majorStyle?: MajorStyle) {
        this._loadCss('jigsaw-outer-theme', `themes/scoped-theme/${theme}-${majorStyle}-outer.css`);
    }

    /**
     * 内部封装样式，影响全局的majorStyle，弹框背景、图形基础皮肤、css变量
     * @param theme
     * @param majorStyle
     */
    public static changeScopedTheme(theme: SupportedTheme, majorStyle?: MajorStyle) {
        majorStyle = majorStyle || this.majorStyle;
        if (majorStyle != this.majorStyle) {
            // scopedTheme影响全局的majorStyle
            this.majorStyle = majorStyle;
        }
        this._usingTheme = theme;

        const style = this._loadCss('jigsaw-scoped-theme', `themes/scoped-theme/${theme}-${majorStyle}-scoped.css`);
        if (!style) {
            // 已经是当前要切换的皮肤
            return;
        }
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
