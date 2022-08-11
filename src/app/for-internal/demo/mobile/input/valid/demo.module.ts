import {NgModule} from "@angular/core";
import {JigsawMobileInputModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {InputValidComponent} from "./demo.component";

@NgModule({
    declarations: [InputValidComponent],
    exports: [InputValidComponent],
    imports: [JigsawMobileInputModule, JigsawDemoDescriptionModule]
})
export class InputValidModule {
}
