import {Component} from "@angular/core";
import {IPopupable, PopupDisposer, PopupOptions} from "../../service/popup.service";

@Component({
    selector: 'rdk-block',
    template: `<div class="rdk-block"></div>`,
    styleUrls: ['block.scss']
})
export class RdkBlock implements IPopupable{
    disposer: PopupDisposer;
    initData: any;
    options: PopupOptions;
}
