import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { JigsawHeaderModule, JigsawMenuModule, JigsawTabsModule, JigsawSelectModule, JigsawTableModule, PopupService, JigsawDialogModule, JigsawButtonModule, JigsawButtonBarModule } from "jigsaw/public_api";
import { JigsawNoviceGuideCustomizedStepIdDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawHeaderModule, CommonModule, JigsawTableModule, JigsawDialogModule, JigsawSelectModule, JigsawDemoDescriptionModule, JigsawMenuModule, JigsawTabsModule, JigsawButtonModule, JigsawButtonBarModule],
    declarations: [JigsawNoviceGuideCustomizedStepIdDemoComponent],
    exports: [JigsawNoviceGuideCustomizedStepIdDemoComponent],
    providers: [PopupService]
})
export class JigsawNoviceGuideCustomizedStepIdDemoModule { }
