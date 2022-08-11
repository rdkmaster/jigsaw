import {NgModule} from "@angular/core";
import {JigsawMobileInputModule, JigsawMobileSwitchModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {InputDisabledComponent} from "./demo.component";

@NgModule({
    declarations: [InputDisabledComponent],
    exports: [InputDisabledComponent],
    imports: [JigsawMobileInputModule, JigsawMobileSwitchModule, JigsawDemoDescriptionModule]
})
export class InputDisabledModule {
}
