import {NgModule} from "@angular/core";
import {JigsawMobileInputModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {InputValueChangeDemoComponent} from "./demo.component";

@NgModule({
    declarations: [InputValueChangeDemoComponent],
    exports: [InputValueChangeDemoComponent],
    imports: [JigsawMobileInputModule, JigsawDemoDescriptionModule]
})
export class InputValueChangeDemoModule {

}
