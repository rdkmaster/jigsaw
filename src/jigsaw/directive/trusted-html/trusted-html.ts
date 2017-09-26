import {Directive, HostBinding, Input, NgModule} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {CommonUtils} from "../../core/utils/common-utils";

export type HtmlCallback = (...args) => any;


@Directive({
    selector: '[trustedHtml], [jigsawTrustedHtml], [jTrustedHtml]'
})
export class JigsawTrustedHtml {
    private static _callbacks: {[callbackName: string]: { callback: HtmlCallback, context: any } } = {};

    private static _jigsawInternalCallbackWrapper(callbackName: string, ...args) {
        const cb = JigsawTrustedHtml._callbacks[callbackName];
        if (!cb) {
            console.error(`callback name[${callbackName}] undeclared! use JigsawTrustedHtml.declareCallback(name, callback, context) to declare a html callback.`);
            return;
        }
        CommonUtils.safeInvokeCallback(cb.context, cb.callback, args);
    }

    public static declareCallback(name: string, callback: HtmlCallback, context: any = undefined, override:boolean = false) {
        if (JigsawTrustedHtml._callbacks[name] && !override) {
            console.error(`callback name[${name}] conflict, use JigsawTrustedHtml.declareCallback(name, callback, context, true) to override the exists callback declaration`);
            return;
        }
        JigsawTrustedHtml._callbacks[name] = {
            callback: callback, context: context
        }
    }

    public static undeclareCallback(name: string) {
        delete JigsawTrustedHtml._callbacks[name];
    }

    //====================================================

    @Input()
    public trustedHtml: string;
    @Input()
    public jTrustedHtml: string;
    @Input()
    public jigsawTrustedHtml: string;

    @HostBinding('innerHtml')
    public get innerHtml(): any {
        if (!window['_jigsawInternalCallbackWrapper']) {
            window['_jigsawInternalCallbackWrapper'] = JigsawTrustedHtml._jigsawInternalCallbackWrapper;
        }

        let html = this.trustedHtml ? this.trustedHtml : '';
        html = this.jTrustedHtml ? this.jTrustedHtml : html;
        html = this.jigsawTrustedHtml ? this.jigsawTrustedHtml : html;

        // hack the user defined callback to the wrapper
        html = html
            .replace(/on(\w+)\s*=(['"])\s*([_$a-z][_$a-z0-9]*)\s*\(/ig, 'on$1=$2_jigsawInternalCallbackWrapper(&quot;$3&quot;,')
            .replace(/(javascript\s*:)\s*([_$a-z][_$a-z0-9]*)\s*\(/ig, '$1_jigsawInternalCallbackWrapper(&quot;$2&quot;,');

        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    constructor(private _sanitizer: DomSanitizer) {
    }
}

@NgModule({
    imports: [],
    declarations: [JigsawTrustedHtml],
    exports: [JigsawTrustedHtml]
})
export class JigsawTrustedHtmlModule {
}



