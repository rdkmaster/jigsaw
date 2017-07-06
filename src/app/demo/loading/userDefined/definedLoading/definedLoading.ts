import {Component, ElementRef, Renderer2} from "@angular/core";
import {JigsawLoadingBase} from "jigsaw/component/loading/loading";

@Component({
    templateUrl: 'definedLoading.html',
    styleUrls: ['definedLoading.scss']
})
export class DefinedLoading extends JigsawLoadingBase {
    constructor(private renderer:Renderer2,private el:ElementRef) {
        super(renderer, el);
    }
}
