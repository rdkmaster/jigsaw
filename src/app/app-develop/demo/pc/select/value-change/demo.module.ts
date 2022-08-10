import { NgModule } from "@angular/core";
import { JigsawSelectModule, JigsawHeaderModule, JigsawButtonModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/app-develop/demo-description/demo-description";
import { SelectValueChangeDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawButtonModule],
    declarations: [SelectValueChangeDemoComponent],
    exports: [SelectValueChangeDemoComponent]
})
export class SelectValueChangeDemoModule {}
