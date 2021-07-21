import { Component } from "@angular/core";
import { CommonUtils } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class AdjustFontColorDemoComponent {
    public _$fontColor: string = "#000000";
    public _$background: string = "#e57409";
    public _$colorChange(color: string) {
        this._$background = color;
        if (CommonUtils.adjustFontColor(color) === "light") {
            this._$fontColor = "#000000";
        } else {
            this._$fontColor = "#FFFFFF";
        }
    }

    /* 颜色转换 */
    hexToRGBValue: string = "";
    hexToRGBResult: string = "";
    hexToRGB(v) {
        this.hexToRGBResult = CommonUtils.hexToRGB(v);
    }

    hexAToRGBAValue: string = "";
    hexAToRGBAResult: string = "";
    hexAToRGBA(v) {
        this.hexAToRGBAResult = CommonUtils.hexAToRGBA(v);
    }

    HSLToRGBValue: string = "";
    HSLToRGBResult: string = "";
    HSLToRGB(v) {
        this.HSLToRGBResult = CommonUtils.HSLToRGB(v);
    }

    HSLAToRGBAValue: string = "";
    HSLAToRGBAResult: string = "";
    HSLAToRGBA(v) {
        this.HSLAToRGBAResult = CommonUtils.HSLAToRGBA(v);
    }

    nameToRGBValue: string = "";
    nameToRGBResult: string = "";
    nameToRGB(v) {
        this.nameToRGBResult = CommonUtils.nameToRGB(v);
    }

    anyToRGBValue: string = "";
    anyToRGBResult: string = "";
    anyToRGB(v) {
        this.anyToRGBResult = CommonUtils.anyToRGB(v);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '展示了按钮的3种使用场景。提示：使用button标签的方式可以与`form`结合使用，设置`type="submit"`。';
    description: string = "";
}
