import {Directive, OnInit, ViewContainerRef, Input, NgModule, OnDestroy, NgZone, ElementRef, Renderer2, AfterViewInit} from "@angular/core";
import {CommonUtils} from "./core/utils/common-utils";
import {take, throwIfEmpty} from 'rxjs/operators';

/**
 * 方便的定义一个渲染器视图的插槽
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

/**
 * Jigsaw所有的组件都实现这个接口
 */
export interface IJigsawComponent {
    /**
     * @internal
     */
    basicClass: string;
    width: string;
    height: string;
    maxHeight: string;
}

/**
 * 一般来说，应用无需关注此类
 */
export abstract class AbstractJigsawViewBase implements OnInit, OnDestroy {
    constructor(protected _zone?: NgZone) {
    }

    private _timerCache = [];

    /**
     * Angular的`OnInit`钩子是否已经执行过，是则为true，否则为false。
     * 方便子类判断当前组件的状态。
     *
     *
     */
    protected initialized: boolean = false;

    /**
     * 延迟一会再执行一些逻辑，用法和`setTimeout`一模一样，差别在于更加安全，当组件被销毁了后，
     * `setTimeout`里已经设置的逻辑依然会被执行，这在某些特定情况下会造成意外，从而造成组件出错。
     * 使用本方法启动的异步逻辑在组件销毁之后，不再被执行。
     *
     * @param handler 需要延迟执行的函数
     */
    protected callLater(handler: Function);
    /**
     * @param handler 需要延迟执行的函数
     * @param timeout 延迟的毫秒数
     */
    protected callLater(handler: Function, timeout: number);
    /**
     * @param handler 需要延迟执行的函数
     * @param context `handler`函数执行的上下文
     */
    protected callLater(handler: Function, context: any);
    /**
     * @param handler 需要延迟执行的函数
     * @param context `handler`函数执行的上下文
     * @param timeout 延迟的毫秒数
     */
    protected callLater(handler: Function, context: any, timeout: number);
    /**
     * @internal
     */
    protected callLater(handler: Function, contextOrTimeout: any | number = undefined, timeout: number = 0): any {
        if (!this._timerCache) {
            // maybe this object has been destroyed!
            return;
        }
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

    /**
     * 终止`callLater`所发起的异步任务，用法与`clearTimeout`非常类似，但是更加安全，
     * 可以顺便将`callLater`所缓存的定时器序号删除。
     *
     * @param handle `callLater`的返回值
     */
    protected clearCallLater(handle: number):void {
        clearTimeout(handle);

        if (!this._timerCache) {
            return;
        }
        const idx = this._timerCache.indexOf(handle);
        if (idx != -1) {
            this._timerCache.splice(idx, 1);
        }
    }

    protected runMicrotask(handler: Function, context?: any) {
        Promise.resolve().then(() => {
            CommonUtils.safeInvokeCallback(context, handler);
        })
    }

    /**
     * 请注意这个函数的回调都是运行在zone之外的，如果要在zone里面运行，请在回调中加zone.run()
     * @param handler
     * @param context
     */
    protected runAfterMicrotasks(handler: Function, context?: any) {
        if(!this._zone) {
            console.error('To use the function `runAfterMicrotasks`, you must inject NgZone!');
        }
        this._zone.onStable.asObservable().pipe(take(1)).subscribe(() => {
            console.log(' only once _zone.onStable called');
            CommonUtils.safeInvokeCallback(context, handler);
        });
    }

    ngOnInit() {
        this.initialized = true;
    }

    ngOnDestroy() {
        this._timerCache.forEach(t => clearTimeout(t));
        this._timerCache = null;
    }
}

/**
 * 一般来说，应用无需关注此类
 */
@Directive()
export abstract class AbstractJigsawComponent extends AbstractJigsawViewBase implements IJigsawComponent {
    constructor(protected _zone?: NgZone, protected renderer?: Renderer2, protected elementRef?: ElementRef) {
        super(_zone);
    }

    /**
     * @internal
     */
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

    protected _theme;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get theme() {
        return this._theme;
    }

    public set theme(theme: 'light' | 'dark' | string) {
        if (CommonUtils.isUndefined(theme)) {
            return
        }
        this._theme = theme;
        this.renderer.setAttribute(this.elementRef.nativeElement, "data-theme", theme)
        if (theme !== 'light' && theme !== 'dark') {
            return;
        }
        let selectorName = this.elementRef.nativeElement.localName.toString();
        selectorName = selectorName.slice(selectorName.indexOf("-") + 1);

        const linkId = `${selectorName}DarkTheme`;
        const themeLink = document.getElementById(linkId) as HTMLLinkElement;
        if (themeLink) {
            return;
        }
        const head = document.getElementsByTagName("head")[0];
        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.id = linkId;
        style.href = `themes/components/${selectorName}-${theme}.css`;
        head.appendChild(style);
    }
}

export interface IJigsawFormControl {
    valid: boolean;
}
