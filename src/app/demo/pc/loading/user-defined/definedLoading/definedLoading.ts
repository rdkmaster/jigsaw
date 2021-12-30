import {Component, ElementRef, Renderer2} from "@angular/core";
import {JigsawLoadingBase} from "jigsaw/public_api";

@Component({
    templateUrl: 'definedLoading.html',
    styleUrls: ['./definedLoading.css']
})
export class DefinedLoading extends JigsawLoadingBase {
    constructor(protected renderer:Renderer2,protected el:ElementRef) {
        super(renderer, el);
    }
}
