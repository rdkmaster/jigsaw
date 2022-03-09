import { Directive, HostBinding, Input, NgModule, NgZone, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CommonUtils } from "../../core/utils/common-utils";

export type HtmlCallback = (...args) => any;
type CallbackValues = { [callbackName: string]: HtmlCallback };

export class JigsawTrustedHtmlBase {
    private static _callbacks = new Map<any, CallbackValues>();
    private static _contexts: { context: object, counter: number }[] = [];
    /**
     * @internal
     */
    public static _zone: NgZone;

    public static getContext(magicNumber: number): any {
        return JigsawTrustedHtmlBase._contexts[magicNumber];
    }

    private static _registerContext(context: any): number {
        if (CommonUtils.isUndefined(context)) {
            return -1;
        }
        const index = JigsawTrustedHtmlBase._contexts.findIndex(i => i && i.context === context);
        let info = JigsawTrustedHtmlBase._contexts[index];
        if (CommonUtils.isUndefined(info)) {
            info = { context: context, counter: 1 };
            JigsawTrustedHtmlBase._contexts.push(info);
        } else {
            info.counter++;
        }
        return index;
    }

    public static jigsawInternalCallbackWrapper(callbackName: string, contextMagicNumber: number, ...args) {
        const contextInfo = JigsawTrustedHtmlBase.getContext(contextMagicNumber);
        if (CommonUtils.isUndefined(contextInfo)) {
            console.error('no context found by magic number, callbackName = ' + callbackName);
            return;
        }
        const callbacks = JigsawTrustedHtmlBase._callbacks.get(contextInfo.context);
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
        JigsawTrustedHtmlBase._zone.run(() => CommonUtils.safeInvokeCallback(contextInfo.context, callback, args));
    }

    public static declareCallback(context: any, name: string, callback: HtmlCallback) {
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

        let callbacks = JigsawTrustedHtmlBase._callbacks.get(context);
        if (CommonUtils.isUndefined(callbacks)) {
            callbacks = {};
            JigsawTrustedHtmlBase._callbacks.set(context, callbacks);
        }
        callbacks[name] = callback;
    }

    public static clearCallbacks(context: any) {
        const idx = JigsawTrustedHtmlBase._contexts.findIndex(i => i && i.context === context);
        if (idx == -1) {
            return;
        }
        const info = JigsawTrustedHtmlBase._contexts[idx];
        info.counter--;
        if (info.counter == 0) {
            JigsawTrustedHtmlBase._callbacks.delete(context);
            info.context = null;
            info.counter = -1;
            JigsawTrustedHtmlBase._contexts[idx] = null;
        }
    }

    public static getMagicNumber(context: any): number {
        return JigsawTrustedHtmlBase._contexts.findIndex(i => i && i.context === context);
    }

    public static getCallback(context: any, accessor: string | string[]): [any, HtmlCallback] {
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
        return this.getCallback(tmp, accessors);
    }

    public static registerContext(context: any, registeredContexts: any[]): number {
        if (CommonUtils.isUndefined(context)) {
            return -1;
        }

        if (!registeredContexts.find(ctx => ctx === context)) {
            JigsawTrustedHtmlBase._registerContext(context);
            registeredContexts.push(context);
        }
        return JigsawTrustedHtmlBase.getMagicNumber(context);
    }

    public static replacer(trustedHtmlContext: any, registeredContexts: any[], prefix, funcAccessor, args): string {
        const [realContext, callback] = JigsawTrustedHtmlBase.getCallback(trustedHtmlContext, funcAccessor);
        const magicNumber = JigsawTrustedHtmlBase.registerContext(realContext, registeredContexts);
        JigsawTrustedHtmlBase.declareCallback(realContext, funcAccessor, callback);
        const modified = `${prefix}jigsawInternalCallbackWrapper(&quot;${funcAccessor}&quot;,${magicNumber}`;
        args = CommonUtils.isDefined(args) ? args.trim() : '';
        return modified + (!!args ? ',' + args + ')' : ')');
    }

    public static updateHtml(trustedHtml: string, trustedHtmlContext: any, registeredContexts: any[]): string {
        trustedHtml = CommonUtils.isUndefined(trustedHtml) ? "" : trustedHtml;
        const modifiedHtml = !trustedHtmlContext ? trustedHtml : trustedHtml
            .replace(/(on|\()(\w+)\)?\s*=(['"])\s*([_$a-z][_$a-z0-9.]*)\s*\((.*?)\)/ig,
                (found, prefix, event, quot, funcAccessor, args) => JigsawTrustedHtmlBase.replacer(trustedHtmlContext, registeredContexts, `on${event}=${quot}`, funcAccessor, args))
            .replace(/(javascript\s*:)\s*([_$a-z][_$a-z0-9]*)\s*\((.*?)\)/ig,
                (found, jsPrefix, funcAccessor, args) => JigsawTrustedHtmlBase.replacer(trustedHtmlContext, registeredContexts, jsPrefix, funcAccessor, args));
        return modifiedHtml;
    }
}

// @dynamic
@Directive({
    selector: '[trustedHtml]',
})
export class JigsawTrustedHtml implements OnInit, OnDestroy {
    constructor(private _sanitizer: DomSanitizer, zone: NgZone) {
        if (!window.hasOwnProperty('jigsawInternalCallbackWrapper') || !(window['jigsawInternalCallbackWrapper'] instanceof Function)) {
            window['jigsawInternalCallbackWrapper'] = JigsawTrustedHtmlBase.jigsawInternalCallbackWrapper;
        }
        JigsawTrustedHtmlBase._zone = zone;
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

    private _registeredContexts: any[] = [];

    private _updateHtml(): void {
        if (!this._initialized) {
            return;
        }
        this._trustedHtml = CommonUtils.isUndefined(this._trustedHtml) ? "" : this._trustedHtml;
        const modifiedHtml = JigsawTrustedHtmlBase.updateHtml(this._trustedHtml, this._trustedHtmlContext, this._registeredContexts)
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
        this._registeredContexts.forEach(ctx => JigsawTrustedHtmlBase.clearCallbacks(ctx));
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



