import {AfterContentInit, Component, ElementRef, EventEmitter, Input, NgModule, OnInit, Output} from "@angular/core";

import {IPopupable} from "../../service/popup.service";
import {bubbleIn} from "../animations/bubble-in";
import {CommonModule} from "@angular/common";

export interface ITooltip extends IPopupable {
    tooltip: RdkTooltipDialog;
}

export abstract class TooltipBase implements ITooltip {

    public initData: any;

    @Output()
    public answer: EventEmitter<any> = new EventEmitter<any>();

    abstract get tooltip(): RdkTooltipDialog;
    abstract set tooltip(value: RdkTooltipDialog);

    public dispose(): void {
        if (this.tooltip) {
            this.tooltip.dispose();
        }
    }

}

@Component({
    selector: 'rdk-tooltip-dialog',
    templateUrl: 'tooltip.html',
    styleUrls: ['tooltip.scss'],
    animations: [
        bubbleIn
    ]
})
export class RdkTooltipDialog implements IPopupable, AfterContentInit {
    public initData: any;
    @Output()
    public answer: EventEmitter<any> = new EventEmitter<any>();

    protected popupElement: HTMLElement;

    constructor(private _elementRef: ElementRef) {
    }

    ngAfterContentInit() {
        this.popupElement = this.getPopupElement();
    }

    protected getPopupElement(): HTMLElement {
        return this._elementRef.nativeElement.querySelector('.rdk-tooltip-dialog');
    }

    public dispose() {
        this.answer.emit();
    }
}

@Component({
    selector: '[rdk-tooltip], [rdkTooltip]', template: ''
})
export class RdkTooltip implements OnInit {
    @Input() public rdkTooltip:string = 'no message';
    // @Input() public rdkTooltipPointerTo:string = 'no message';

    constructor() {
    }

    ngOnInit(): void {
        console.log(this.rdkTooltip);
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [RdkTooltipDialog, RdkTooltip],
    exports: [RdkTooltipDialog, RdkTooltip]
})
export class RdkTooltipModule {

}
