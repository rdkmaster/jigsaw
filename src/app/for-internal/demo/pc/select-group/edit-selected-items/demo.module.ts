import { NgModule } from "@angular/core";
import { JigsawSelectModule, JigsawHeaderModule, JigsawCheckBoxModule, JigsawButtonModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { SelectGroupEditResultDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawCheckBoxModule, JigsawButtonModule],
    declarations: [SelectGroupEditResultDemoComponent],
    exports: [SelectGroupEditResultDemoComponent]
})
export class SelectGroupEditResultDemoModule { }
