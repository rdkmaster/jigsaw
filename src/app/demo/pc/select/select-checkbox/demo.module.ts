import { NgModule } from "@angular/core";
import { JigsawSelectModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { SelectCheckboxDemoComponent } from "./demo.component";

@NgModule({
    imports: [
        JigsawSelectModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule
    ],
    declarations: [SelectCheckboxDemoComponent],
    exports: [SelectCheckboxDemoComponent]
})
export class SelectCheckboxDemoModule {}
