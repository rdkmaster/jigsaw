import {Directive, HostBinding, Input, NgModule, NgZone, OnDestroy, OnInit} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {CommonUtils} from "../../core/utils/common-utils";

export type HtmlCallback = (...args) => any;
type CallbackValues = { [callbackName: string]: HtmlCallback };
type ContextInfo = { context: object, counter: number };

export class TrustedHtmlHelper {
    private static _callbacks = new Map<object, CallbackValues>();
    private static _contexts: ContextInfo[] = [];
    private static _zone: NgZone;

    public static init(zone: NgZone) {
        if (!window.hasOwnProperty('_jigsawInternalCallbackWrapper') || !(window['_jigsawInternalCallbackWrapper'] instanceof Function)) {
            window['_jigsawInternalCallbackWrapper'] = TrustedHtmlHelper._jigsawInternalCallbackWrapper;
        }
        this._zone = zone;
    }

    private static _getContext(magicNumber: number): ContextInfo {
        return this._contexts[magicNumber];
    }


    private static _jigsawInternalCallbackWrapper(callbackName: string, contextMagicNumber: number, ...args) {
        const contextInfo = this._getContext(contextMagicNumber);
        if (CommonUtils.isUndefined(contextInfo)) {
            console.error('no context found by magic number, callbackName = ' + callbackName);
            return;
        }
        const callbacks = this._callbacks.get(contextInfo.context);
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
        this._zone.run(() => CommonUtils.safeInvokeCallback(contextInfo.context, callback, args));
    }

    private static _declareCallback(context: object, name: string, callback: HtmlCallback) {
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

        let callbacks = this._callbacks.get(context);
        if (CommonUtils.isUndefined(callbacks)) {
            callbacks = {};
            this._callbacks.set(context, callbacks);
        }
        callbacks[name] = callback;
    }

    public static clearCallbacks(context: object) {
        const idx = this._contexts.findIndex(i => i && i.context === context);
        if (idx == -1) {
            return;
        }
        const info = this._contexts[idx];
        info.counter--;
        if (info.counter == 0) {
            this._callbacks.delete(context);
            info.context = null;
            info.counter = -1;
            this._contexts[idx] = null;
        }
    }

    private static _getMagicNumber(context: object): number {
        return this._contexts.findIndex(i => i && i.context === context);
    }

    private static _getCallback(context: object, accessor: string | string[]): [object, HtmlCallback] {
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

    private static _registerContext(context: object, registeredContexts: object[]): number {
        if (CommonUtils.isUndefined(context)) {
            return -1;
        }

        if (!registeredContexts.find(ctx => ctx === context)) {
            if (CommonUtils.isDefined(context)) {
                const index = this._contexts.findIndex(i => i && i.context === context);
                let info = this._contexts[index];
                if (CommonUtils.isUndefined(info)) {
                    info = { context: context, counter: 1 };
                    this._contexts.push(info);
                } else {
                    info.counter++;
                }
            }
            registeredContexts.push(context);
        }
        return this._getMagicNumber(context);
    }

    private static _replacer(trustedHtmlContext: object, registeredContexts: object[], prefix, funcAccessor, args): string {
        const [realContext, callback] = this._getCallback(trustedHtmlContext, funcAccessor);
        const magicNumber = this._registerContext(realContext, registeredContexts);
        this._declareCallback(realContext, funcAccessor, callback);
        const modified = `${prefix}jigsawInternalCallbackWrapper(&quot;${funcAccessor}&quot;,${magicNumber}`;
        args = CommonUtils.isDefined(args) ? args.trim() : '';
        return modified + (!!args ? ',' + args + ')' : ')');
    }

    public static updateHtml(trustedHtml: string, trustedHtmlContext: object, registeredContexts: object[]): string {
        trustedHtml = CommonUtils.isUndefined(trustedHtml) ? "" : trustedHtml;
        return !trustedHtmlContext ? trustedHtml : trustedHtml
            .replace(/(on|\()(\w+)\)?\s*=(['"])\s*([_$a-z][_$a-z0-9.]*)\s*\((.*?)\)/ig,
                (found, prefix, event, quot, funcAccessor, args) =>
                    TrustedHtmlHelper._replacer(trustedHtmlContext, registeredContexts, `on${event}=${quot}`, funcAccessor, args))
            .replace(/(javascript\s*:)\s*([_$a-z][_$a-z0-9]*)\s*\((.*?)\)/ig,
                (found, jsPrefix, funcAccessor, args) =>
                    TrustedHtmlHelper._replacer(trustedHtmlContext, registeredContexts, jsPrefix, funcAccessor, args));
    }
}

// @dynamic
@Directive({
    selector: '[trustedHtml]',
})
export class JigsawTrustedHtml implements OnInit, OnDestroy {
    constructor(private _sanitizer: DomSanitizer, zone: NgZone) {
        TrustedHtmlHelper.init(zone);
    }

    private _initialized: boolean = false;
    private _modifiedHtml: string;
    private _registeredContexts: object[] = [];
    private _safeHtml: SafeHtml;

    private _trustedHtmlContext: object;

    @Input()
    public get trustedHtmlContext(): object {
        return this._trustedHtmlContext;
    }

    public set trustedHtmlContext(value: object) {
        if (CommonUtils.isUndefined(value)) {
            return;
        }
        this._trustedHtmlContext = value;
        this._updateHtml();
    }

    private _trustedHtml: string;

    @Input()
    public get trustedHtml(): string {
        return this._trustedHtml;
    }

    public set trustedHtml(value: string) {
        this._trustedHtml = CommonUtils.isDefined(value) ? value.trim() : '';
        this._updateHtml();
    }

    private _updateHtml(): void {
        if (!this._initialized) {
            return;
        }
        this._trustedHtml = CommonUtils.isUndefined(this._trustedHtml) ? "" : this._trustedHtml;
        const modifiedHtml = TrustedHtmlHelper.updateHtml(this._trustedHtml, this._trustedHtmlContext, this._registeredContexts)
        if (modifiedHtml != this._modifiedHtml || !this._safeHtml) {
            this._modifiedHtml = modifiedHtml;
            this._safeHtml = this._sanitizer.bypassSecurityTrustHtml(modifiedHtml);
        }
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
        this._registeredContexts.forEach(ctx => TrustedHtmlHelper.clearCallbacks(ctx));
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
