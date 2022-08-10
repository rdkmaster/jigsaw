import { NgModule } from "@angular/core";
import { JigsawSelectModule, JigsawHeaderModule, JigsawCheckBoxModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/app-develop/demo-description/demo-description";
import { SelectCollapseDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawCheckBoxModule],
    declarations: [SelectCollapseDemoComponent],
    exports: [SelectCollapseDemoComponent]
})
export class SelectCollapseDemoModule {}
