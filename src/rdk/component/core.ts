
import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[rdk-renderer-host]',
})
export class RdkRendererHost {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
