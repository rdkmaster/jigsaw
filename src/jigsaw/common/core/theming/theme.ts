import {darkGraphTheme, lightGraphTheme} from "./echarts-theme";

export type MajorStyle = "dark" | "gray" | "black" | "purple" | "blue" | "paletx" | "default";
export type PopupBackgroundColor = "#102331" | "#232429" | "#151518" | "#1c1c2e" | "#102940" | "#ffffff";

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
            case "gray":
                this._popupBackgroundColor = "#232429";
                break;
            case "black":
                this._popupBackgroundColor = "#151518";
                break;
            case "purple":
                this._popupBackgroundColor = "#1c1c2e";
                break;
            case "blue":
                this._popupBackgroundColor = "#102940";
                break;
            case 'default':
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
