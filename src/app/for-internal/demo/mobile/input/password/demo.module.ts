import {NgModule} from "@angular/core";
import {JigsawMobileInputModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {InputPasswordComponent} from "./demo.component";

@NgModule({
    declarations: [InputPasswordComponent],
    exports: [InputPasswordComponent],
    imports: [JigsawMobileInputModule, JigsawDemoDescriptionModule]
})
export class InputPasswordModule {
}
