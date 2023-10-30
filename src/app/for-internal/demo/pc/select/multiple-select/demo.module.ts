import { NgModule } from "@angular/core";
import { JigsawSelectModule, JigsawHeaderModule, JigsawButtonModule, JigsawInputModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { MultipleSelectDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawButtonModule, JigsawInputModule],
    declarations: [MultipleSelectDemoComponent],
    exports: [MultipleSelectDemoComponent]
})
export class MultipleSelectDemoModule {}
