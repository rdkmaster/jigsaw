import { NgModule } from "@angular/core";
import { JigsawHeaderModule, JigsawInputModule, JigsawSwitchModule } from "jigsaw/public_api";
import { InputReadonlyDemoComponent } from "./demo.component";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [InputReadonlyDemoComponent],
    exports: [InputReadonlyDemoComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawHeaderModule]
})
export class InputReadonlyDemoModule {

}
