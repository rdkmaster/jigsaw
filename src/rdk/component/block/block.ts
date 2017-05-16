import {Component, EventEmitter, NgModule} from "@angular/core";
import {IPopupable} from "../../service/popup.service";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'rdk-block',
    template: `<div class="rdk-block"></div>`,
    styleUrls: ['block.scss']
})
export class RdkBlock implements IPopupable{
    initData: any;
    close: EventEmitter<any>;
}

@NgModule({
    imports: [CommonModule],
    declarations: [RdkBlock],
    exports: [RdkBlock]
})
export class RdkBlockModule {

}
