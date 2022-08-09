import { NgModule } from "@angular/core";
import { JigsawSelectModule, JigsawHeaderModule, JigsawCheckBoxModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { SelectGroupDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawSelectModule,  JigsawHeaderModule, JigsawCheckBoxModule],
    declarations: [SelectGroupDemoComponent],
    exports: [SelectGroupDemoComponent]
})
export class SelectGroupDemoModule {}
