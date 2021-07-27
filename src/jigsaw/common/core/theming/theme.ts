import {darkGraphTheme, lightGraphTheme} from "./echarts-theme";

export type SupportedTheme = 'paletx-pro' | 'vmax';
export type MajorStyle = "dark" | "light";
export type PopupBackgroundColor = "#1b1d26" | "#ffffff";

declare const document;

export type ThemeProperty = {name: string, value: string};

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

        const cssHref = `themes/${theme}-${majorStyle}.css`;
        const head = document.getElementsByTagName("head")[0];
        const themeLink = document.getElementById("jigsaw-theme") as HTMLLinkElement;
        if (themeLink) {
            themeLink.href = cssHref;
        } else {
            const style = document.createElement("link");
            style.id = "jigsaw-theme";
            style.rel = "stylesheet";
            style.href = cssHref;
            head.appendChild(style);

            style.onload = () => {
                this._readThemeProperties();
            };
        }
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

    public static getGraphTheme(): any {
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

    public static getThemeProperty(prop: string): string {
        const data = this._themeProperties.find(p => p.hasOwnProperty(prop));
        return data ? data[prop] : undefined;
    }

    public static getThemeProperties(): ThemeProperty[] {
        return this._themeProperties;
    }
}
