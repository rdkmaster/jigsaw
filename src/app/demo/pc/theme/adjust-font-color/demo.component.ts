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

    hslToRGBValue: string = "";
    hslToRGBResult: string = "";
    hslToRGB(v) {
        this.hslToRGBResult = CommonUtils.hslToRGB(v);
    }

    hslAToRGBAValue: string = "";
    hslAToRGBAResult: string = "";
    hslAToRGBA(v) {
        this.hslAToRGBAResult = CommonUtils.hslAToRGBA(v);
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
    summary: string = '展示了文本颜色如何在背景修改时自动调整黑/白，以达到合适的对比度；';
    description: string = "";
}
