import {Component, ElementRef, Renderer2} from "@angular/core";
import {RdkLoadingBase} from "../../../../../../component/loading/loading";

@Component({
    templateUrl: 'definedLoading.html',
    styleUrls: ['definedLoading.scss']
})
export class DefinedLoading extends RdkLoadingBase {
    constructor(renderer: Renderer2) {
        super(renderer);
    }
}
