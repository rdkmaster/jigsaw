import {NgModule} from "@angular/core";
import {JigsawMobileInputModule} from "jigsaw/mobile_public_api";
import {InputBasicDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [InputBasicDemoComponent],
    exports: [InputBasicDemoComponent],
    imports: [JigsawMobileInputModule, JigsawDemoDescriptionModule]
})
export class InputBasicDemoModule {

}
