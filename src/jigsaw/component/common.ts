import {Directive, OnInit, ViewContainerRef, Input, NgModule, OnDestroy} from "@angular/core";
import {CommonUtils} from "../core/utils/common-utils";

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
    private _timerCache = [];

    /**
     * 延迟一会在执行一些逻辑，常常用于解决时间差的问题
     *
     * @param {Function} handler 需要延迟执行的函数
     */
    protected callLater(handler: Function);
    /**
     * 延迟一会在执行一些逻辑，常常用于解决时间差的问题
     *
     * @param {Function} handler 需要延迟执行的函数
     * @param {number} timeout 延迟的毫秒数
     */
    protected callLater(handler: Function, timeout: number);
    /**
     * 延迟一会在执行一些逻辑，常常用于解决时间差的问题
     *
     * @param {Function} handler 需要延迟执行的函数
     * @param {any} context `handler`函数执行的上下文
     */
    protected callLater(handler: Function, context: any);
    /**
     * 延迟一会在执行一些逻辑，常常用于解决时间差的问题
     *
     * @param {Function} handler 需要延迟执行的函数
     * @param context `handler`函数执行的上下文
     * @param {number} timeout 延迟的毫秒数
     */
    protected callLater(handler: Function, context: any, timeout: number);
    /**
     * @internal
     */
    protected callLater(handler: Function, contextOrTimeout: any | number = undefined, timeout: number = 0): any {
        if (typeof contextOrTimeout === 'number') {
            timeout = +contextOrTimeout;
            contextOrTimeout = null;
        }

        const timer = setTimeout(() => {
            if (!this._timerCache) {
                // maybe this object has been destroyed!
                return;
            }
            const idx = this._timerCache.indexOf(timer);
            if (idx != -1) {
                this._timerCache.splice(idx, 1);
            }
            CommonUtils.safeInvokeCallback(contextOrTimeout, handler);
        }, timeout);
        this._timerCache.push(timer);
        return timer;
    }

    ngOnInit() {
        this.initialized = true;
    }

    ngOnDestroy() {
        this._timerCache.forEach(t => clearTimeout(t));
        this._timerCache = null;
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
