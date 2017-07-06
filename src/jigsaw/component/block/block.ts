import {Component, EventEmitter, NgModule} from "@angular/core";
import {IPopupable} from "../../service/popup.service";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'jigsaw-block',
    template: `<div class="jigsaw-block"></div>`,
    styleUrls: ['block.scss']
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
