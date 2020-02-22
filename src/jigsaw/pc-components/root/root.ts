import {Component, NgModule, NgZone, Renderer2, ViewContainerRef} from "@angular/core";
import {PopupService} from "../../common/service/popup.service";
import {JigsawNotification} from "../notification/notification";

@Component({
    selector: 'jigsaw-root, j-root',
    template: '<ng-content></ng-content>'
})
export class JigsawRoot {
    constructor(viewContainerRef: ViewContainerRef, renderer: Renderer2, zone: NgZone,
                ps:PopupService /* do not remove this line, need for global PopupService instantiate! */) {
        PopupService._viewContainerRef = viewContainerRef;
        PopupService._renderer = renderer;
        JigsawNotification._zone = zone;
        JigsawNotification._renderer = renderer;
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
