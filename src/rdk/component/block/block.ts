import {Component, EventEmitter} from "@angular/core";
import {IPopupable} from "../../service/popup.service";

@Component({
    selector: 'rdk-block',
    template: `<div class="rdk-block"></div>`,
    styleUrls: ['block.scss']
})
export class RdkBlock implements IPopupable{
    initData: any;
    close: EventEmitter<any>;
}
