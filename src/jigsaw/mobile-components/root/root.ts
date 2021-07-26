import {Component, NgModule, NgZone, Renderer2, ViewContainerRef} from "@angular/core";
import {PopupService} from "../../common/service/popup.service";
import {InternalUtils} from "../../common/core/utils/internal-utils";

@Component({
    selector: 'jigsaw-mobile-root, jm-root',
    template: '<ng-content></ng-content>'
})
export class JigsawRoot {
    constructor(viewContainerRef: ViewContainerRef, renderer: Renderer2, zone: NgZone,
                ps:PopupService /* do not remove this line, need for global PopupService instantiate! */) {
        InternalUtils.viewContainerRef = viewContainerRef;
        InternalUtils.renderer = renderer;
    }
}

@NgModule({
    declarations: [JigsawRoot],
    exports: [JigsawRoot],
    providers: [PopupService]
})
export class JigsawMobileRootModule {
}
