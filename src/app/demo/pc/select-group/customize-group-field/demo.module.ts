import { NgModule } from "@angular/core";
import { JigsawSelectModule, JigsawHeaderModule, JigsawCheckBoxModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { SelectGroupCustomizeGroupFieldDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawCheckBoxModule],
    declarations: [SelectGroupCustomizeGroupFieldDemoComponent],
    exports: [SelectGroupCustomizeGroupFieldDemoComponent]
})
export class SelectGroupCustomizeGroupFieldDemoModule { }
