import {Directive, ElementRef, HostListener, Renderer2} from "@angular/core";
import {JigsawUploadBase} from "./upload.base";
import {HttpClient} from "@angular/common/http";

@Directive({
    selector: '[j-upload], [jigsaw-upload]',

})
export class JigsawUploadDirective extends JigsawUploadBase {
    constructor(protected _http: HttpClient, protected _renderer: Renderer2, protected _elementRef: ElementRef) {
        super(_http, _renderer, _elementRef);
    }

    @HostListener('click', ['$event'])
    onClick($event) {
        this._$selectFile($event);
    }

    @HostListener('mouseenter', ['$event.target'])
    onMouseEnter() {

    }
}
