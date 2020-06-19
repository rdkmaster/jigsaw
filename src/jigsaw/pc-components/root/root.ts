import {Component, Injector, NgModule, NgZone, Renderer2, ViewContainerRef} from "@angular/core";
import {PopupService} from "../../common/service/popup.service";
import {InternalUtils} from "../../common/core/utils/internal-utils";

@Component({
    selector: 'jigsaw-root, j-root',
    template: '<ng-content></ng-content>'
})
export class JigsawRoot {
    constructor(viewContainerRef: ViewContainerRef, renderer: Renderer2, zone: NgZone, injector: Injector,
                ps:PopupService /* do not remove this line, need for global PopupService instantiate! */) {
        InternalUtils.viewContainerRef = viewContainerRef;
        InternalUtils.renderer = renderer;
        InternalUtils.zone = zone;
    }
}

@NgModule({
    declarations: [JigsawRoot],
    exports: [JigsawRoot],
    imports: [],
    providers: [PopupService]
})
export class JigsawRootModule {
}
