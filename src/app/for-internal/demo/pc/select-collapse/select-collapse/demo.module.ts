import { NgModule } from "@angular/core";
import { JigsawSelectModule, JigsawHeaderModule, JigsawSwitchModule, JigsawButtonBarModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { SelectCollapseDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawSwitchModule,
    JigsawButtonBarModule],
    declarations: [SelectCollapseDemoComponent],
    exports: [SelectCollapseDemoComponent]
})
export class SelectCollapseDemoModule {}
