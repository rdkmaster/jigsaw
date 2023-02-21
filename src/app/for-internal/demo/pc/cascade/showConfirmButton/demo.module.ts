import { NgModule } from "@angular/core";
import { JigsawCascadeModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { CascadeShowConfirmButtonDemoComponent } from "./demo.component";
import { JigsawHeaderModule } from "jigsaw/public_api";

@NgModule({
    declarations: [CascadeShowConfirmButtonDemoComponent],
    exports: [CascadeShowConfirmButtonDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawSwitchModule]
})
export class CascadeShowConfirmButtonDemoModule {

}
