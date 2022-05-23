import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { JigsawHeaderModule, JigsawMenuModule, JigsawTabsModule, JigsawSelectModule, JigsawTableModule } from "jigsaw/public_api";
import { JigsawNoviceGuideBasicDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawHeaderModule, CommonModule, JigsawTableModule, JigsawSelectModule, JigsawDemoDescriptionModule, JigsawMenuModule, JigsawTabsModule],
    declarations: [JigsawNoviceGuideBasicDemoComponent],
    exports: [JigsawNoviceGuideBasicDemoComponent]
})
export class JigsawNoviceGuideBasicDemoModule { }
