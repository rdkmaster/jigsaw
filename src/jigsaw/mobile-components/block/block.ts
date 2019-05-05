import {Component, ElementRef, EventEmitter, NgModule, Renderer2} from "@angular/core";
import {IPopupable} from "../../common/service/popup.service";
import {CommonModule} from "@angular/common";

/**
 * 这是一个特殊的组件，它唯一的作用是就挡住其他的组件，从而隔离用户与被挡住组件之间的交互。
 * 常常用于配合模态框、loading组件一起使用，而不会单独使用。
 *
 * $demo = loading/full
 * $demo = loading/ball
 * $demo = loading/bubble
 * $demo = loading/font-icon
 */
@Component({
    selector: 'jigsaw-mobile-block, jm-block',
    template: `<div class="jigsaw-block"></div>`,
})
export class JigsawMobileBlock implements IPopupable {
    initData: any;
    answer: EventEmitter<any>;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
        this._renderer.addClass(this._elementRef.nativeElement, 'jigsaw-block-host');
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawMobileBlock],
    exports: [JigsawMobileBlock]
})
export class JigsawMobileBlockModule {

}
