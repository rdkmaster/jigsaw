import {Input} from "@angular/core";

export interface IRDKComponent {
    //组件基础样式
    basicClass: string;
    width: string;
    height: number;
}

export abstract class AbstractRDKComponent implements IRDKComponent {

    @Input()
    public basicClass: string;

    protected _width: string;
    @Input()
    public get width(): string {
        return this._width
    }

    public set width(newValue: string) {
        const match = newValue ? newValue.match(/^\s*\d+%|px\s*$/) : null;
        this._width =  match ? newValue : newValue + 'px';
    }

    @Input() public height: number;

}

