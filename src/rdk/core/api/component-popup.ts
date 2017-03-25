import {Input} from "@angular/core";
import {AbstractRDKComponent} from "./component-api";
import {InternalUtils} from "../utils/internal-utils";

export interface PositionComponent {
    position: string;
    top: string;
    left: string;
    right: string;
    bottom: string;
}

export abstract class PopupComponent extends AbstractRDKComponent implements PositionComponent {
    @Input() public position: string;

    protected _top: string;
    protected _left: string;
    protected _right: string;
    protected _bottom: string;
    @Input()
    public get top(): string {
        return this._top
    }

    public set top(newValue: string) {
        this._top =  InternalUtils.getViewData(newValue);
    }

    @Input()
    public get left(): string {
        return this._left
    }

    public set left(newValue: string) {
        this._left =  InternalUtils.getViewData(newValue);
    }

    @Input()
    public get right(): string {
        return this._right
    }

    public set right(newValue: string) {
        this._right =  InternalUtils.getViewData(newValue);
    }

    @Input()
    public get bottom(): string {
        return this._bottom
    }

    public set bottom(newValue: string) {
        this._bottom =  InternalUtils.getViewData(newValue);
    }
}

