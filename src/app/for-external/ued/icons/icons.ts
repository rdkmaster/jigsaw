import { Component, OnInit } from "@angular/core";
import { JigsawToast } from "jigsaw/public_api";

const iconfontInfo = require('./iconfont.json');

@Component({
    templateUrl: './icons.html',
    styleUrls: ['./icons.scss']
})
export class IconsDemoComponent implements OnInit {
    public iconGroup = [];

    public icons = [];
    public _$currentIcons = [];
    public _$searchKeyword: string = '';

    public _$currentGroupIndex: number = -1;

    public _$clickGroupTag(i: number) {
        this._$currentGroupIndex = i;
        this._$searchIcons(this._$searchKeyword);
    }

    public _$searchIcons(keyword: string) {
        keyword = keyword.toLowerCase();
        if (this._$currentGroupIndex >= 0) {
            const groupId = this.iconGroup[this._$currentGroupIndex].id;
            this._$currentIcons = this.icons.filter(icon => {
                return icon.iconGroup == groupId
            })
        } else {
            this._$currentIcons = this.icons;
        }
        if (keyword != '') {
            this._$currentIcons = this._$currentIcons.filter(icon => {
                return ('iconfont-' + icon.iconCode.toLowerCase()).indexOf(keyword) != -1 || icon.iconName.indexOf(keyword) != -1
            })
        }
    }

    public _$getGroupName(name): string {
        return name.split(/[(（]+/)[0];
    }

    public copyToClipboard(iconCode: string) {
        const text = "iconfont-" + iconCode.toLowerCase();
        const el = document.createElement("textarea");
        el.value = text;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        JigsawToast.show(`${text} 已复制到剪切板`);
    }

    ngOnInit() {
        this.iconGroup = iconfontInfo.group;
        this.icons = iconfontInfo.icons;
        this._$searchIcons('');
        window.scrollTo(0, 0);
    }
}
