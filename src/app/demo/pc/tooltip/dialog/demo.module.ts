import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawTooltipModule, PopupService} from "jigsaw/public_api";
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
