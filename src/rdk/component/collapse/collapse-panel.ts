/**
 * Created by 10177553 on 2017/4/26.
 */

import {Component, Input, OnInit, Host, Inject, forwardRef, Output} from "@angular/core";
import {RdkCollapse, CollapseModule} from "./collapse";

@Component({
    selector: 'rdk-panel',
    templateUrl: './collapse-panel.html'
})
export class RdkPanel implements OnInit{

    constructor(@Host() @Inject(forwardRef(() => RdkCollapse)) private _collapse) { }

    @Input()
    public header: string;

    @Input()
    public isActive: boolean = false;

    // 默认生成key. 临时方法可能存在重复.
    key: string = "p-" + Math.round(Math.random() * 1000000).toString();

    private _onClick() {
        // 手风琴, 自动关闭其他的pane;
        if(this._collapse&& this._collapse._rdkPanel&& (this._collapse.mode === "accordion"|| this._collapse.mode === CollapseModule.accordion)) {
            this._collapse._rdkPanel.forEach(item => {
                if(item.key === this.key) {
                    item.isActive = !item.isActive;
                } else {
                    item["isActive"] = true;
                }
            })
        } else {
            this.isActive = !this.isActive;
        }
    }

    ngOnInit() {
        this._onClick();
    }
}
