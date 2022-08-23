import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2, OnDestroy } from "@angular/core";
import { CommonUtils } from "../../core/utils/common-utils";
import { AbstractJigsawViewBase } from "../../common";
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

@Directive({
    selector: '[jigsawRibbon], [jigsaw-ribbon]'
})
export class JigsawRibbonDirective extends AbstractJigsawViewBase {
    constructor(private _elementRef: ElementRef, private _render: Renderer2) {
        super();
    }

    private _ribbon: HTMLElement;

    ngAfterViewInit(): void {
        console.log(this._elementRef.nativeElement);
    }
}
