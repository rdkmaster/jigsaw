import {Component, EventEmitter, NgModule} from "@angular/core";
import {IPopupable} from "../../service/popup.service";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'jigsaw-block, j-block',
    template: `<div class="jigsaw-block"></div>`,
})
export class JigsawBlock implements IPopupable{
    initData: any;
    answer: EventEmitter<any>;
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawBlock],
    exports: [JigsawBlock]
})
export class JigsawBlockModule {

}
