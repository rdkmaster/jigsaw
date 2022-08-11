import {NgModule} from "@angular/core";
import {JigsawMobileInputModule, JigsawMobileCheckBoxModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {InputSelectDemoComponent} from "./demo.component";

@NgModule({
    declarations: [InputSelectDemoComponent],
    exports: [InputSelectDemoComponent],
    imports: [JigsawMobileInputModule, JigsawMobileCheckBoxModule, JigsawDemoDescriptionModule]
})
export class InputSelectDemoModule {

}
