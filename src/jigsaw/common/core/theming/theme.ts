import {darkGraphTheme, lightGraphTheme} from "./echarts-theme";

export type MajorStyle = "dark" | "light";
export type PopupBackgroundColor = "#102331" | "#ffffff";

// @dynamic
export class JigsawTheme {
    private static _popupBackgroundColor: PopupBackgroundColor = "#ffffff";
    private static _majorStyle: MajorStyle = null;

    public static get majorStyle(): MajorStyle {
        return this._majorStyle;
    }

    public static set majorStyle(value: MajorStyle) {
        this._majorStyle = value;

        switch (value) {
            case "dark":
                this._popupBackgroundColor = "#102331";
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
}
