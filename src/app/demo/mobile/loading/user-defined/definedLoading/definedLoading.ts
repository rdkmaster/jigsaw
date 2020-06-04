import {Component, ElementRef, Renderer2} from "@angular/core";
import {JigsawLoadingBase} from "jigsaw/mobile_public_api";

@Component({
    templateUrl: 'definedLoading.html',
    styleUrls: ['./definedLoading.css']
})
export class DefinedLoading extends JigsawLoadingBase {
    constructor(private renderer:Renderer2,private el:ElementRef) {
        super(renderer, el);
    }
}
