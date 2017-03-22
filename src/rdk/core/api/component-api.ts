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
        if (newValue.indexOf('%') == -1 && newValue.indexOf('px') == -1) {
            this._width = newValue + 'px';
        } else {
            this._width = newValue;
        }
    }

    @Input() public height: number;

}

