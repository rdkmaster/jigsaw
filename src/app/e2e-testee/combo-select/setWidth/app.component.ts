import {Component, Renderer2, ViewContainerRef} from '@angular/core';
import {DropDownTrigger} from "jigsaw/component/combo-select/combo-select";
@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class ComboSelectSetWidthDemo{
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
    width: string = '200';
    width2: string = '400';
}
