import { NgModule } from "@angular/core";
import { JigsawSelectModule, JigsawHeaderModule, JigsawCheckBoxModule, JigsawInputModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { SelectGroupDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawCheckBoxModule, JigsawInputModule],
    declarations: [SelectGroupDemoComponent],
    exports: [SelectGroupDemoComponent]
})
export class SelectGroupDemoModule {}
