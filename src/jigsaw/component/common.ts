import {Directive, OnInit, ViewContainerRef, Input, NgModule, AfterViewInit, OnDestroy} from "@angular/core";
import {CommonUtils} from "../core/utils/common-utils";
import {PopupService} from "../service/popup.service";

/**
 * @internal
 */
@Directive({
    selector: '[jigsaw-renderer-host]',
})
export class JigsawRendererHost {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}

@NgModule({
    declarations: [JigsawRendererHost], exports: [JigsawRendererHost]
})
export class JigsawCommonModule {
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

export abstract class AbstractJigsawViewBase implements OnInit, OnDestroy {
    protected initialized: boolean = false;
    private _timeout = [];

    protected callLater(handler: Function, timeout:number = 0): any {
        const timer = setTimeout(() => {
            if (!this._timeout) {
                // maybe this object has been destroyed!
                return;
            }
            const idx = this._timeout.indexOf(timer);
            if (idx != -1) {
                this._timeout.splice(idx, 1);
            }
            CommonUtils.safeInvokeCallback(null, handler);
        }, timeout);
        this._timeout.push(timer);
        return timer;
    }

    ngOnInit() {
        this.initialized = true;
    }

    ngOnDestroy() {
        this._timeout.forEach(t => clearTimeout(t));
        this._timeout = null;
    }
}

export abstract class AbstractJigsawComponent extends AbstractJigsawViewBase implements IJigsawComponent {
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
        this._width = CommonUtils.getCssValue(value);
    }

    @Input()
    public get height(): string {
        return this._height;
    }

    public set height(value: string) {
        this._height = CommonUtils.getCssValue(value);
    }

    @Input()
    public get maxHeight(): string {
        return this._maxHeight;
    }

    public set maxHeight(value: string) {
        this._maxHeight = CommonUtils.getCssValue(value);
    }
}

export interface IJigsawFormControl {
    valid: boolean;
}
