import {Component, ElementRef, Renderer2} from "@angular/core";
import {RdkLoadingBase} from "../../../../../rdk/component/loading/loading";

@Component({
    templateUrl: 'definedLoading.html',
    styleUrls: ['definedLoading.scss']
})
export class DefinedLoading extends RdkLoadingBase {
    constructor(private renderer:Renderer2,private el:ElementRef) {
        super(renderer, el);
    }
}
