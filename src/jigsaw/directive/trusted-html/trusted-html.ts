import {Directive, HostBinding, Input, NgModule, NgZone, OnDestroy, OnInit} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {CommonUtils} from "../../core/utils/common-utils";

export type HtmlCallback = (...args) => any;
type CallbackValues = { [callbackName: string]: HtmlCallback };

@Directive({
    selector: '[trustedHtml]',
})
export class JigsawTrustedHtml implements OnInit, OnDestroy {
    private static _callbacks = new Map<any, CallbackValues>();
    private static _contexts: { context: any, counter: number }[] = [];
    /**
     * @internal
     */
    public static _zone: NgZone;

    private static _getContext(magicNumber: number): any {
        return JigsawTrustedHtml._contexts[magicNumber];
    }

    private static _registerContext(context: any): number {
        if (CommonUtils.isUndefined(context)) {
            return -1;
        }
        const index = JigsawTrustedHtml._contexts.findIndex(i => i && i.context === context);
        let info = JigsawTrustedHtml._contexts[index];
        if (CommonUtils.isUndefined(info)) {
            info = {context: context, counter: 1};
            JigsawTrustedHtml._contexts.push(info);
        } else {
            info.counter++;
        }
        return index;
    }

    private static _jigsawInternalCallbackWrapper(callbackName: string, contextMagicNumber: number, ...args) {
        const contextInfo = JigsawTrustedHtml._getContext(contextMagicNumber);
        if (CommonUtils.isUndefined(contextInfo)) {
            console.error('no context found by magic number, callbackName = ' + callbackName);
            return;
        }
        const callbacks = JigsawTrustedHtml._callbacks.get(contextInfo.context);
        if (CommonUtils.isUndefined(callbacks)) {
            console.error('no callback cache info found by magic number, callbackName = ' + callbackName);
            return;
        }
        const callback = callbacks[callbackName];
        if (!(callback instanceof Function)) {
            console.error(`no callback function named "${callbackName}" found`);
            console.log(`Hint: add a member method named ${callbackName} to the context object.`);
            return;
        }
        JigsawTrustedHtml._zone.run(() => CommonUtils.safeInvokeCallback(contextInfo.context, callback, args));
    }

    private static _declareCallback(context: any, name: string, callback: HtmlCallback) {
        if (CommonUtils.isUndefined(context)) {
            console.error(`invalid context for callback "{$name}"`);
            return;
        }
        if (CommonUtils.isUndefined(callback)) {
            console.error(`invalid callback "${name}", it is undefined.`);
            return;
        }
        if (!(callback instanceof Function)) {
            console.error(`invalid callback "${name}", it is not a function.`);
            return;
        }

        let callbacks = JigsawTrustedHtml._callbacks.get(context);
        if (CommonUtils.isUndefined(callbacks)) {
            callbacks = {};
            JigsawTrustedHtml._callbacks.set(context, callbacks);
        }
        callbacks[name] = callback;
    }

    private static _clearCallbacks(context: any) {
        const idx = JigsawTrustedHtml._contexts.findIndex(i => i && i.context === context);
        if (idx == -1) {
            return;
        }
        const info = JigsawTrustedHtml._contexts[idx];
        info.counter--;
        if (info.counter == 0) {
            JigsawTrustedHtml._callbacks.delete(context);
            info.context = null;
            info.counter = -1;
            JigsawTrustedHtml._contexts[idx] = null;
        }
    }

    //====================================================

    constructor(private _sanitizer: DomSanitizer, zone: NgZone) {
        if (!window.hasOwnProperty('_jigsawInternalCallbackWrapper') || !(window['_jigsawInternalCallbackWrapper'] instanceof Function)) {
            window['_jigsawInternalCallbackWrapper'] = JigsawTrustedHtml._jigsawInternalCallbackWrapper;
        }
        JigsawTrustedHtml._zone = zone;
    }

    private _trustedHtmlContext: any;
    private _initialized: boolean = false;

    @Input()
    public get trustedHtmlContext(): any {
        return this._trustedHtmlContext;
    }

    public set trustedHtmlContext(value: any) {
        if (CommonUtils.isUndefined(value)) {
            return;
        }
        this._trustedHtmlContext = value;
        this._updateHtml();
    }

    private _safeHtml: any;
    private _trustedHtml: string;

    @Input()
    public get trustedHtml(): string {
        return this._trustedHtml;
    }

    public set trustedHtml(value: string) {
        this._trustedHtml = CommonUtils.isDefined(value) ? value.trim() : '';
        this._updateHtml();
    }

    private _modifiedHtml: string;

    private _updateHtml(): void {
        if (!this._trustedHtml || !this._initialized) {
            return;
        }
        const modifiedHtml = !this._trustedHtmlContext ? this._trustedHtml : this._trustedHtml
            .replace(/(on|\()(\w+)\)?\s*=(['"])\s*([_$a-z][_$a-z0-9.]*)\s*\((.*?)\)/ig,
                (found, prefix, event, quot, funcAccessor, args) => this._replacer(`on${event}=${quot}`, funcAccessor, args))
            .replace(/(javascript\s*:)\s*([_$a-z][_$a-z0-9]*)\s*\((.*?)\)/ig,
                (found, jsPrefix, funcAccessor, args) => this._replacer(jsPrefix, funcAccessor, args));
        if (modifiedHtml != this._modifiedHtml || !this._safeHtml) {
            this._modifiedHtml = modifiedHtml;
            this._safeHtml = this._sanitizer.bypassSecurityTrustHtml(modifiedHtml);
        }
    }

    private _replacer(prefix, funcAccessor, args) {
        const [realContext, callback] = this._getCallback(this._trustedHtmlContext, funcAccessor);
        const magicNumber = this._registerContext(realContext);
        JigsawTrustedHtml._declareCallback(realContext, funcAccessor, callback);
        const modified = `${prefix}_jigsawInternalCallbackWrapper(&quot;${funcAccessor}&quot;,${magicNumber}`;
        args = CommonUtils.isDefined(args) ? args.trim() : '';
        return modified + (!!args ? ',' + args + ')' : ')');
    }

    private _getCallback(context: any, accessor: string | string[]): [any, HtmlCallback] {
        if (CommonUtils.isUndefined(context) || CommonUtils.isUndefined(accessor)) {
            return [null, null];
        }
        const accessors = accessor instanceof Array ? accessor : accessor.split(/\./);
        if (accessors[0] == 'this') {
            // 例如 this.aa.bb() 这里的this指context本身，要跳过
            // 这里可能会误伤这样的情况 this.aa.this.bb()，因为实际情况下是不可能有这样的属性链的，因此无视这个情况
            accessors.shift();
        }

        const tmp: any = context[accessors[0]];
        if (accessors.length == 1) {
            return [context, tmp];
        }
        accessors.shift();
        return this._getCallback(tmp, accessors);
    }

    private _registeredContexts: any[] = [];

    private _registerContext(context: any): number {
        if (CommonUtils.isUndefined(context)) {
            return -1;
        }

        if (!this._registeredContexts.find(ctx => ctx === context)) {
            JigsawTrustedHtml._registerContext(context);
            this._registeredContexts.push(context);
        }
        return this._getMagicNumber(context);
    }

    private _getMagicNumber(context: any): number {
        return JigsawTrustedHtml._contexts.findIndex(i => i && i.context === context);
    }

    @HostBinding('innerHtml')
    public get innerHtml(): any {
        return this._safeHtml ? this._safeHtml : '';
    }

    ngOnInit() {
        this._initialized = true;
        this._updateHtml();
    }

    ngOnDestroy() {
        this._registeredContexts.forEach(ctx => JigsawTrustedHtml._clearCallbacks(ctx));
        this._registeredContexts = null;
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



