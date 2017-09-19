import {Component, ElementRef, EventEmitter, NgModule, Renderer2} from "@angular/core";
import {IPopupable} from "../../service/popup.service";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'jigsaw-block, j-block',
    template: `<div class="jigsaw-block"></div>`,
})
export class JigsawBlock implements IPopupable{
    initData: any;
    answer: EventEmitter<any>;
    constructor(private _renderer: Renderer2, private _elementRef: ElementRef){
        this._renderer.addClass(this._elementRef.nativeElement, 'jigsaw-block-host');
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawBlock],
    exports: [JigsawBlock]
})
export class JigsawBlockModule {

}
