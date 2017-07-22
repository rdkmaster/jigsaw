import { NgModule } from '@angular/core';
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { JigsawTooltipModule } from "jigsaw/component/tooltip/tooltip";
import { PopupService } from "jigsaw/service/popup.service";
import { TooltipDialogDemoComponent }  from './app.component';
import { UserTooltipDialogComponent } from "./user-defined-tooltip-dialog";

@NgModule({
    imports: [ JigsawButtonModule, JigsawTooltipModule ],
    declarations: [ TooltipDialogDemoComponent, UserTooltipDialogComponent ],
    bootstrap: [ TooltipDialogDemoComponent ],
    providers: [ PopupService ],
    entryComponents: [ UserTooltipDialogComponent ]
})
export class TooltipDialogDemoModule {}
