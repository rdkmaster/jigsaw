import {Directive, HostBinding, Input, NgModule, OnDestroy, OnInit} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {CommonUtils} from "../../core/utils/common-utils";

export type HtmlCallback = (...args) => any;
type CallbackValues = { [callbackName: string]: HtmlCallback };

@Directive({
    selector: '[trustedHtml]',
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
            console.error('invalid callback, it is not a function.');
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
        if (CommonUtils.isDefined(this._trustedHtmlContext)) {
            JigsawTrustedHtml._clearCallbacks(this._trustedHtmlContext);
        }
        this._trustedHtmlContext = value;
        JigsawTrustedHtml._registerContext(value);
        this._contextMagicNumber = JigsawTrustedHtml._getContextMagicNumber(value);
    }

    private _safeHtml: any;
    private _trustedHtml: string;

    @Input()
    public get trustedHtml(): string {
        return this._trustedHtml;
    }

    public set trustedHtml(value: string) {
        console.log(value);
        this._trustedHtml = CommonUtils.isDefined(value) ? value.trim() : '';
        this._updateHtml();
    }

    private _modifiedHtml:string;

    private _updateHtml():void {
        if (!this._trustedHtml || !this._trustedHtmlContext || this._contextMagicNumber == -1) {
            return;
        }
        const modifiedHtml = this._trustedHtml
            .replace(/on(\w+)\s*=(['"])\s*([_$a-z][_$a-z0-9]*)\s*\((.*?)\)/ig,
                (found, event, quot, func, args) => {
                    JigsawTrustedHtml._declareCallback(this._trustedHtmlContext, func, this._trustedHtmlContext[func]);
                    const modified = `on${event}=${quot}_jigsawInternalCallbackWrapper(&quot;${func}&quot;,${this._contextMagicNumber}`;
                    args = CommonUtils.isDefined(args) ? args.trim() : '';
                    return modified + (!!args ? ',' + args + ')' : ')');
                })
            .replace(/(javascript\s*:)\s*([_$a-z][_$a-z0-9]*)\s*\((.*?)\)/ig,
                (found, jsPrefix, func, args) => {
                    JigsawTrustedHtml._declareCallback(this._trustedHtmlContext, func, this._trustedHtmlContext[func]);
                    const modified = `${jsPrefix}_jigsawInternalCallbackWrapper(&quot;${func}&quot;,${this._contextMagicNumber}`;
                    args = CommonUtils.isDefined(args) ? args.trim() : '';
                    return modified + (!!args ? ',' + args + ')' : ')');
                });
        if (modifiedHtml != this._modifiedHtml) {
            console.log('dddddddddd');
            this._modifiedHtml = modifiedHtml;
            this._safeHtml = this._sanitizer.bypassSecurityTrustHtml(modifiedHtml);
        }
    }

    @HostBinding('innerHtml')
    public get innerHtml(): any {
        return this._safeHtml;
    }

    ngOnInit() {
        this._updateHtml();
    }

    ngOnDestroy() {
        JigsawTrustedHtml._clearCallbacks(this._trustedHtmlContext);
        this._trustedHtmlContext = null;
        this._trustedHtml = null;
        this._safeHtml = null;
    }
}

@NgModule({
    imports: [],
    declarations: [JigsawTrustedHtml],
    exports: [JigsawTrustedHtml]
})
export class JigsawTrustedHtmlModule {
}



