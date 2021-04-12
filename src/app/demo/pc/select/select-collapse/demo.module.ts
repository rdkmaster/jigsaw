import { NgModule } from "@angular/core";
import { JigsawSelectModule, JigsawHeaderModule, JigsawSelectGroup } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { SelectCollapseDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [SelectCollapseDemoComponent],
    exports: [SelectCollapseDemoComponent]
})
export class SelectCollapseDemoModule {}
