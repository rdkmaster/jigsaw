

import {Input, Renderer, ElementRef} from "@angular/core";

export interface IRDKComponent {
    //组件基础样式
    basicClass:string;
    width: string;
    height: string;
}

export abstract class AbstractRDKComponent implements IRDKComponent {
    constructor(private __renderer: Renderer, private __elementRef: ElementRef) {
    }

    @Input()
    public basicClass:string;

    protected _width:string = '';
    @Input()
    public get width(): string {
        return this._width;
    }
    public set width(value:string) {
        this._width = value;
    }

    private _height:string = '';
    @Input()
    get height(): string {
        return this._height;
    }
    set height(value:string) {
        this._height = value;
    }
}

