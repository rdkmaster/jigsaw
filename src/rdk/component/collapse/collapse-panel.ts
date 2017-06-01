/**
 * Created by 10177553 on 2017/4/26.
 */

import {Component, Input, Host, Inject, forwardRef} from "@angular/core";
import {RdkCollapse, CollapseMode} from "./collapse";

@Component({
    selector: 'rdk-panel',
    templateUrl: './collapse-panel.html'
})
export class RdkPanel{

    constructor(@Host() @Inject(forwardRef(() => RdkCollapse)) private _collapse) {
    }

    @Input()
    public title: string;

    @Input()
    public isActive: boolean = false;

    private _onClick() {
        // 手风琴, 自动关闭其他的pane;
        if (this._collapse && this._collapse._rdkPanel &&
            (this._collapse.mode === "accordion" || this._collapse.mode === CollapseMode.accordion)) {
            this._collapse._rdkPanel.forEach(item => {
                if (item !== this && item.isActive) {
                    item.isActive = false;
                }
            })
        }
        
        this.isActive = !this.isActive;
    }

}
