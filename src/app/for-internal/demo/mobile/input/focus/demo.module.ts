import {NgModule} from "@angular/core";
import {JigsawMobileInputModule, JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {InputFocusDemoComponent} from "./demo.component";

@NgModule({
    declarations: [InputFocusDemoComponent],
    exports: [InputFocusDemoComponent],
    imports: [JigsawMobileInputModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule]
})
export class InputFocusDemoModule {

}
