import {NgModule} from '@angular/core';
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawTooltipModule} from "jigsaw/component/tooltip/tooltip";
import {PopupService} from "jigsaw/service/popup.service";
import {TooltipDialogDemoComponent} from './demo.component';
import {UserTooltipDialogComponent} from "./user-defined-tooltip-dialog";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawButtonModule, JigsawTooltipModule, JigsawDemoDescriptionModule],
    declarations: [TooltipDialogDemoComponent, UserTooltipDialogComponent],
    exports: [TooltipDialogDemoComponent],
    providers: [PopupService],
    entryComponents: [UserTooltipDialogComponent]
})
export class TooltipDialogDemoModule {
}
