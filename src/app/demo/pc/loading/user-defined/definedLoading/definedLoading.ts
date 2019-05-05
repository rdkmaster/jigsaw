import {Component, ElementRef, Renderer2} from "@angular/core";
import {JigsawLoadingBase} from "jigsaw/pc-components/loading/loading";

@Component({
    templateUrl: 'definedLoading.html',
    styleUrls: ['./definedLoading.css']
})
export class DefinedLoading extends JigsawLoadingBase {
    constructor(private renderer:Renderer2,private el:ElementRef) {
        super(renderer, el);
    }
}
