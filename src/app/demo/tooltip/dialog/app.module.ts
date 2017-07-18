import { NgModule } from '@angular/core';
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { JigsawTooltipModule } from "jigsaw/component/tooltip/tooltip";
import { TooltipDialogDemoComponent }  from './app.component';
import { UserTooltipDialogComponent } from "./user-defined-tooltip-dialog";

@NgModule({
    imports: [ JigsawButtonModule, JigsawTooltipModule ],
    declarations: [ TooltipDialogDemoComponent, UserTooltipDialogComponent ],
    bootstrap: [ TooltipDialogDemoComponent ],
    entryComponents: [
        UserTooltipDialogComponent
    ]
})
export class TooltipDialogDemoModule {}
