import {Component, NgModule, Renderer2, ViewContainerRef} from "@angular/core";
import {PopupService} from "../../service/popup.service";
import {JigsawBlock, JigsawBlockModule} from "../block/block";
import {
    JigsawAlertModule, JigsawConfirmAlert, JigsawErrorAlert, JigsawInfoAlert,
    JigsawWarningAlert
} from "../alert/alert";
import {
    JigsawBallLoading, JigsawBubbleLoading, JigsawFontLoading, JigsawLoading,
    JigsawLoadingModule
} from "../loading/loading";


@Component({
    selector: 'jigsaw-root',
    template: '<ng-content></ng-content>'
})
export class JigsawRoot {
    constructor(viewContainerRef: ViewContainerRef, renderer: Renderer2, ps:PopupService) {
        PopupService.instance = ps;
        PopupService._viewContainerRef = viewContainerRef;
        PopupService._renderer = renderer;
    }
}

@NgModule({
    declarations: [JigsawRoot],
    exports: [JigsawRoot],
    imports: [JigsawBlockModule, JigsawAlertModule, JigsawLoadingModule],
    providers: [PopupService],
    entryComponents: [
        JigsawBlock, JigsawInfoAlert, JigsawWarningAlert, JigsawErrorAlert, JigsawConfirmAlert,
        JigsawBallLoading, JigsawBubbleLoading, JigsawFontLoading, JigsawLoading
    ]
})
export class JigsawRootModule {
}
