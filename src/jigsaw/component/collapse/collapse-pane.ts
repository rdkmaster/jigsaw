import {Component, Input, Host, Inject, forwardRef} from "@angular/core";
import {JigsawCollapse, CollapseMode} from "./collapse";

@Component({
    selector: 'jigsaw-collapse-pane',
    templateUrl: './collapse-pane.html'
})
export class JigsawCollapsePane{

    constructor(@Host() @Inject(forwardRef(() => JigsawCollapse)) private _collapse) {
    }

    @Input()
    public title: string;

    @Input()
    public isActive: boolean = false;

    /**
     * @internal
     */
    public _$onClick() {
        // 手风琴, 自动关闭其他的pane;
        if (this._collapse && this._collapse.panes &&
            (this._collapse.mode === "accordion" || this._collapse.mode === CollapseMode.accordion)) {
            this._collapse.panes.forEach(item => {
                if (item !== this && item.isActive) {
                    item.isActive = false;
                }
            })
        }

        this.isActive = !this.isActive;
    }

}
