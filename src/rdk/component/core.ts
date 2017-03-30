
import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[rdk-renderer-host]',
})
export class RdkRendererHost {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

import {Input} from "@angular/core";

export interface IRDKComponent {
    //组件基础样式
    basicClass: string;
    width: string;
    height: string;
}

export abstract class AbstractRDKComponent implements IRDKComponent {

    @Input()
    public basicClass: string;

    protected _width: string;
    protected _height: string;
    @Input()
    public get width(): string {
        return this._width
    }

    public set width(newValue: string) {
        const match = newValue ? newValue.match(/^\s*\d+%|px\s*$/) : null;
        this._width =  match ? newValue : newValue + 'px';
    }

    @Input()
    public get height(): string {
        return this._height;
    }

    public set height(newValue: string) {
        const match = newValue ? newValue.match(/^\s*\d+%|px\s*$/) : null;
        this._height =  match ? newValue : newValue + 'px';
    }

}

