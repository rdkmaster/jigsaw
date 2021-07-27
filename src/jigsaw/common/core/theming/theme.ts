import {darkGraphTheme, lightGraphTheme} from "./echarts-theme";

export type SupportedTheme = 'paletx-pro' | 'vmax';
export type MajorStyle = "dark" | "light";
export type PopupBackgroundColor = "#1b1d26" | "#ffffff";

declare const document;

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
        let themeLink = document.getElementById("jigsaw-theme") as HTMLLinkElement;
        if (themeLink) {
            themeLink.href = cssHref;
        } else {
            const style = document.createElement("link");
            style.id = "jigsaw-theme";
            style.rel = "stylesheet";
            style.href = cssHref;
            head.appendChild(style);

            style.onload = () => {
                this.getCSSCustomProps();
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

    private static isStyleRule = (rule): boolean => {
        return rule.type === 1 && rule.selectorText === ":root";
    }
    
    private static isThemeFile = (styleSheet) => {
        if (styleSheet.ownerNode.id === "jigsaw-theme") {
            return true;
        }
    }

    public static getCSSCustomProps():[] {
        const styleSheet = [...document.styleSheets].filter(this.isThemeFile)[0];
        const styleRules = [...styleSheet.cssRules].filter(this.isStyleRule);
        let propNames: any = [];
        let propArrs: any = [];
        styleRules.forEach(styleRule => {
            const propName = [...styleRule.style];
            const propArr = propName.map(propName => [
                propName.trim(),
                styleRule.style.getPropertyValue(propName).trim()
            ]);
            propNames.push(...propName);
            propArrs.push(...propArr);
        });
        return propArrs;
    }

    private static _themeProperties = {
        'paletx-pro': {
            light: {
                //...
            },
            dark: {
                //...
            }
        },
        'vmax': {
            light: {
                //...
            }
        }
    }

    private static _paletxProLightProperties = {
        'font-size-sm': '12px',
    }

    private static _paletxProDarkProperties = {
        'font-size-sm': '12px',
    }

    private static _vmaxLightProperties = {
        'font-size-sm': '12px',
    }

    public static getThemeProperties(prop: string, theme?: SupportedTheme, majorStyle?: MajorStyle): string {
        return this._themeProperties[theme || this._usingTheme][majorStyle || this.majorStyle][prop];
    }
}
