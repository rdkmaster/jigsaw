import {Component, NgModule, NgZone, Renderer2, ViewContainerRef} from "@angular/core";
import {PopupService} from "../../common/service/popup.service";
import {JigsawBlock, JigsawBlockModule} from "../../common/components/block/block";
import {
    JigsawAlertModule, JigsawConfirmAlert, JigsawErrorAlert, JigsawInfoAlert,
    JigsawWarningAlert
} from "../alert/alert";
import {
    JigsawBallLoading, JigsawBubbleLoading, JigsawFontLoading, JigsawLoading,
    JigsawLoadingModule
} from "../../common/components/loading/loading";
import {JigsawNotification, JigsawNotificationModule} from "../notification/notification";

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
    imports: [
        JigsawBlockModule, JigsawAlertModule, JigsawLoadingModule, JigsawNotificationModule
    ],
    providers: [PopupService]
})
export class JigsawRootModule {
}
