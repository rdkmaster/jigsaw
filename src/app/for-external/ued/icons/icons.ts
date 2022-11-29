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

    private _commonIcon = ['e1fe', 'e2b0', 'e2b6', 'e179', 'e36f', 'e33a', 'e347', 'e14b', 'e1c7', 'e1c8', 'e4f7', 'e015', 'e2a8', 'e24c', 'e24f', 'e0a1',
        'e177', 'e35d', 'e292', 'e231', 'e2f6', 'e35b', 'e366', 'e3dd', 'e4bc', 'e23f', 'e1a5', 'e142', 'e34a', 'e294', 'e295', 'e44f', 'e7f0',
        'e7f1', 'e45e', 'e45f'];

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
        } else if (this._$currentGroupIndex == -2) {
            this._$currentIcons = this.icons.filter(icon => this._commonIcon.includes(icon.iconCode.toLowerCase()));
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
        const exclusiveGroup = [];
        this.iconGroup = iconfontInfo.group.filter(g => {
            if (g.groupName.indexOf("禁用") == -1) {
                return true;
            } else {
                exclusiveGroup.push(g.id)
            }
        });

        this.icons = iconfontInfo.icons.filter(icon => {
            return !exclusiveGroup.includes(icon.iconGroup);
        });
        
        this._$searchIcons('');
        window.scrollTo(0, 0);
    }
}
