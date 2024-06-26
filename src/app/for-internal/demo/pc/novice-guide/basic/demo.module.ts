import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { JigsawHeaderModule, JigsawMenuModule, JigsawTabsModule, JigsawSelectModule, JigsawTableModule, PopupService, JigsawDialogModule, JigsawButtonModule, JigsawButtonBarModule } from "jigsaw/public_api";
import { JigsawNoviceGuideBasicDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawHeaderModule, CommonModule, JigsawTableModule, JigsawDialogModule, JigsawSelectModule, JigsawDemoDescriptionModule, JigsawMenuModule, JigsawTabsModule, JigsawButtonModule, JigsawButtonBarModule],
    declarations: [JigsawNoviceGuideBasicDemoComponent],
    exports: [JigsawNoviceGuideBasicDemoComponent],
    providers: [PopupService]
})
export class JigsawNoviceGuideBasicDemoModule { }
