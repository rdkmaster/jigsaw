import { Component, ElementRef, Renderer2 } from "@angular/core";
import { JigsawLoadingBase } from "jigsaw/public_api";

@Component({
    templateUrl: 'defined-loading.html',
    styleUrls: ['./defined-loading.css']
})
export class DefinedLoading extends JigsawLoadingBase {
    constructor(private renderer: Renderer2, private el: ElementRef) {
        super(renderer, el);
    }
}
