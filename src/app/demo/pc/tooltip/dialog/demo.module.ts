import {NgModule} from '@angular/core';
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawTooltipModule} from "jigsaw/pc-components/tooltip/tooltip";
import {PopupService} from "jigsaw/common/service/popup.service";
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
