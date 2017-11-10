import {Component, NgModule, Renderer2, ViewContainerRef, ViewChild} from "@angular/core";
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
    selector: 'jigsaw-root, j-root',
    template: `
        <ng-content></ng-content>
        <div class="jigsaw-popup-container">
            <ng-container #popupContainer></ng-container>
        </div>`
})
export class JigsawRoot {
    constructor(viewContainerRef: ViewContainerRef, renderer: Renderer2,
                ps: PopupService /* do not remove this line, need for global PopupService instantiate! */) {
        PopupService._renderer = renderer;
    }

    @ViewChild('popupContainer', {read: ViewContainerRef})
    popupContainer: ViewContainerRef;

    ngAfterViewInit() {
        PopupService._viewContainerRef = this.popupContainer;
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
