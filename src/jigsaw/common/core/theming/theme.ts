import {EventEmitter, Injectable, Type} from "@angular/core";
import {darkGraphTheme, lightGraphTheme} from "./echarts-theme";
import {ScopedThemeUtils, ScopedThemeInfo} from "../utils/scoped-theme-utils";

export type SupportedTheme = "paletx-pro" | "vmax-pro" | "idea" | "masbd" | "zjcm" | "awade" | "copilot" | "paletx-pro-mobile";
export type MajorStyle = "dark" | "light";
export type PopupBackgroundColor = "var(--bg-container)" | "#ffffff";

declare const document;

export type ThemeProperty = { name: string, value: string };
export type ThemeInfo = { usingTheme: string, majorStyle: string, target?: Type<JigsawTheme> };

// @dynamic
export class JigsawTheme {
    protected static _popupBackgroundColor: PopupBackgroundColor = "#ffffff";
    protected static _majorStyle: MajorStyle = null;
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

    public static changeTheme(theme: SupportedTheme, majorStyle?: MajorStyle, scopedThemeInfo?: ScopedThemeInfo) {
        majorStyle = majorStyle || this.majorStyle;
        if (majorStyle != this.majorStyle) {
            this.majorStyle = majorStyle;
        }
        this._usingTheme = theme;

        let style;
        if(scopedThemeInfo) {
            const themeClass = ScopedThemeUtils.getThemeClass(scopedThemeInfo.name);
            const cssFile = `${theme}-${majorStyle}-${scopedThemeInfo.name}.css`;
            style = this._loadCss(themeClass, `themes/scoped-theme/${cssFile}`);
        } else {
            style = this._loadCss('jigsaw-theme', `themes/${theme}-${majorStyle}.css`);
        }
        if (!style) {
            // 已经是当前要切换的皮肤
            return;
        }
        style.onload = () => {
            this._themeProperties.splice(0, this._themeProperties.length);
            this._readThemeProperties(scopedThemeInfo);
            this.themeChange.emit({usingTheme: this._usingTheme, majorStyle: this._majorStyle, target: this});
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
                this._popupBackgroundColor = "var(--bg-container)";
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

    protected static _themeProperties: ThemeProperty[] = [];

    private static _readThemeProperties(scopedThemeInfo?: ScopedThemeInfo): void {
        const {styleId, selector} = ScopedThemeUtils.getStyleInfo(scopedThemeInfo);
        const styleSheet = [...document.styleSheets].find(styleSheet => styleSheet.ownerNode.id === styleId);
        if (!styleSheet) {
            return;
        }
        const styleRules = [...styleSheet.cssRules].filter(rule => rule.type === 1 && rule.selectorText === selector);
        styleRules.forEach(styleRule => {
            const propNames = [...styleRule.style];
            const properties = propNames.filter(propName => propName.startsWith('--'))
                .map(propName => ({name: propName.trim(), value: styleRule.style.getPropertyValue(propName).trim()}));
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

// @dynamic
@Injectable()
export class JigsawThemeService extends JigsawTheme {
    public changeTheme(theme: SupportedTheme, majorStyle?: MajorStyle, scopedThemeInfo?: ScopedThemeInfo) {
        (this.constructor as typeof JigsawThemeService).changeTheme(theme, majorStyle, scopedThemeInfo);
    }

    public get majorStyle(): MajorStyle {
        return (this.constructor as typeof JigsawThemeService).majorStyle;
    }

    public set majorStyle(value: MajorStyle) {
        (this.constructor as typeof JigsawThemeService).majorStyle = value;
    }

    public get popupBackgroundColor(): PopupBackgroundColor {
        return (this.constructor as typeof JigsawThemeService)._popupBackgroundColor;
    }

    public getGraphTheme(theme?: 'light' | 'dark' | string): any {
        if (theme) {
            return theme == 'dark' ? darkGraphTheme : lightGraphTheme;
        }
        return this.popupBackgroundColor == "#ffffff" ? lightGraphTheme : darkGraphTheme;
    }

    public getProperty(prop: string): string {
        const data = (this.constructor as typeof JigsawThemeService)._themeProperties.find(p => p.name == prop);
        return data?.value;
    }

    public getProperties(): ThemeProperty[] {
        return [...(this.constructor as typeof JigsawThemeService)._themeProperties];
    }

    public get themeChange(): EventEmitter<ThemeInfo> {
        return (this.constructor as typeof JigsawThemeService).themeChange;
    }
}
