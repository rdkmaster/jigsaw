
import {Directive, OnInit, ViewContainerRef, Input} from "@angular/core";
import {CommonUtils} from "../core/utils/common-utils";

@Directive({
    selector: '[jigsaw-renderer-host]',
})
export class JigsawRendererHost {
    constructor(public viewContainerRef: ViewContainerRef) { }
}


export interface IDynamicInstantiatable {
    initData: any;
}

export interface IJigsawComponent {
    //组件基础样式
    basicClass: string;
    width: string;
    height: string;
    maxHeight: string;
}

export abstract class AbstractJigsawComponent implements IJigsawComponent, OnInit {

    @Input()
    public basicClass: string;

    protected _width: string;
    protected _height: string;
    protected _maxHeight: string;

    @Input()
    public get width(): string {
        return this._width;
    }

    public set width(value: string) {
        this._width =  CommonUtils.getCssValue(value);
    }

    @Input()
    public get height(): string {
        return this._height;
    }

    public set height(value: string) {
        this._height =  CommonUtils.getCssValue(value);
    }

    @Input()
    public get maxHeight(): string {
        return this._maxHeight;
    }

    public set maxHeight(value: string) {
        this._maxHeight =  CommonUtils.getCssValue(value);
    }

    //TODO 所有组件都使用这个属性判断是否初始化好
    protected initialized:boolean = false;
    ngOnInit() {
        this.initialized = true;
    }
}

