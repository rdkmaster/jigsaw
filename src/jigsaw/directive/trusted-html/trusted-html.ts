import {Directive, ElementRef, HostBinding, Input, NgModule, OnDestroy, OnInit, Renderer2} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {CommonUtils} from "../../core/utils/common-utils";

export type HtmlCallback = (...args) => any;
type CallbackValues = { [callbackName: string]: HtmlCallback };

@Directive({
    selector: '[trustedHtml], [jigsawTrustedHtml], [jTrustedHtml]',
})
export class JigsawTrustedHtml implements OnInit, OnDestroy {
    private static _callbacks = new Map<any, CallbackValues>();
    private static _contexts = [];

    private static _getContextMagicNumber(context: any): number {
        return JigsawTrustedHtml._contexts.indexOf(context);
    }

    private static _getContext(magicNumber: number): any {
        return JigsawTrustedHtml._contexts[magicNumber];
    }

    private static _registerContext(context: any): void {
        if (CommonUtils.isDefined(context) && JigsawTrustedHtml._getContextMagicNumber(context) == -1) {
            JigsawTrustedHtml._contexts.push(context);
        }
    }

    private static _jigsawInternalCallbackWrapper(callbackName: string, contextMagicNumber: number, ...args) {
        const context = JigsawTrustedHtml._getContext(contextMagicNumber);
        if (CommonUtils.isUndefined(context)) {
            console.error('no context found by magic number: ' + contextMagicNumber);
            return;
        }
        const callbacks = JigsawTrustedHtml._callbacks.get(context);
        if (CommonUtils.isUndefined(callbacks)) {
            console.error('no callback cache info found by magic number: ' + contextMagicNumber);
            return;
        }
        const callback = callbacks[callbackName];
        if (!(callback instanceof Function)) {
            console.error('no callback function found by callback name: ' + callbackName);
            console.log(`Hint: add a member method named ${callbackName} to your component's class.`);
            return;
        }
        CommonUtils.safeInvokeCallback(context, callback, args);
    }

    private static _declareCallback(context: any, name: string, callback: HtmlCallback) {
        if (CommonUtils.isUndefined(context)) {
            console.error('invalid context');
            return;
        }
        if (!(callback instanceof Function)) {
            console.error('invalid context');
            return;
        }

        let callbacks = JigsawTrustedHtml._callbacks.get(context);
        if (CommonUtils.isUndefined(callbacks)) {
            callbacks = {};
            JigsawTrustedHtml._callbacks.set(context, callbacks);
        }
        callbacks[name] = CommonUtils.isDefined(callback) ? callback : context;
    }

    private static _clearCallbacks(context: any) {
        JigsawTrustedHtml._callbacks.delete(context);
    }

    //====================================================

    constructor(private _sanitizer: DomSanitizer) {
        if (!window.hasOwnProperty('_jigsawInternalCallbackWrapper') || !(window['_jigsawInternalCallbackWrapper'] instanceof Function)) {
            window['_jigsawInternalCallbackWrapper'] = JigsawTrustedHtml._jigsawInternalCallbackWrapper;
        }
    }

    private _contextMagicNumber: number = -1;
    private _trustedHtmlContext: any;

    @Input()
    public get trustedHtmlContext(): any {
        return this._trustedHtmlContext;
    }

    public set trustedHtmlContext(value: any) {
        if (CommonUtils.isUndefined(value)) {
            return;
        }

        this._trustedHtmlContext = value;
        JigsawTrustedHtml._registerContext(value);
        this._contextMagicNumber = JigsawTrustedHtml._getContextMagicNumber(value);
    }

    @Input()
    public trustedHtml: string;
    @Input()
    public jTrustedHtml: string;
    @Input()
    public jigsawTrustedHtml: string;

    private _html: string;

    @HostBinding('innerHtml')
    public get innerHtml(): any {
        return this._sanitizer.bypassSecurityTrustHtml(this._html);
    }

    ngOnInit() {
        this._html = this.trustedHtml ? this.trustedHtml : '';
        this._html = this.jTrustedHtml ? this.jTrustedHtml : this._html;
        this._html = this.jigsawTrustedHtml ? this.jigsawTrustedHtml : this._html;
        this._html = this._html.trim();
        if (!this._html || !this.trustedHtmlContext || this._contextMagicNumber == -1) {
            return;
        }

        this._html = this._html
            .replace(/on(\w+)\s*=(['"])\s*([_$a-z][_$a-z0-9]*)\s*\(/ig,
                (found, event, quot, func) => {
                    JigsawTrustedHtml._declareCallback(this.trustedHtmlContext, func, this.trustedHtmlContext[func]);
                    return `on${event}=${quot}_jigsawInternalCallbackWrapper(&quot;${func}&quot;,${this._contextMagicNumber},`;
                })
            .replace(/(javascript\s*:)\s*([_$a-z][_$a-z0-9]*)\s*\(/ig,
                (found, jsPrefix, func) => {
                    JigsawTrustedHtml._declareCallback(this.trustedHtmlContext, func, this.trustedHtmlContext[func]);
                    return `${jsPrefix}_jigsawInternalCallbackWrapper(&quot;${func}&quot;,${this._contextMagicNumber},`;
                });
    }

    ngOnDestroy() {
        JigsawTrustedHtml._clearCallbacks(this.trustedHtmlContext);
        this._trustedHtmlContext = null;
        this.trustedHtml = null;
        this.jigsawTrustedHtml = null;
        this.jTrustedHtml = null;
        this._html = null;
    }
}

@NgModule({
    imports: [],
    declarations: [JigsawTrustedHtml],
    exports: [JigsawTrustedHtml]
})
export class JigsawTrustedHtmlModule {
}



