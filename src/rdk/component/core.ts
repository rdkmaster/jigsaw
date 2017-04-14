
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

    public set width(value: string) {
        value = typeof value === 'string' ? value : value + '';
        const match = value ? value.match(/^\s*\d+%|px\s*$/) : null;
        this._width =  match ? value : value + 'px';
    }

    @Input()
    public get height(): string {
        return this._height;
    }

    public set height(value: string) {
        value = typeof value === 'string' ? value : value + '';
        const match = value ? value.match(/^\s*\d+%|px\s*$/) : null;
        this._height =  match ? value : value + 'px';
    }
}

