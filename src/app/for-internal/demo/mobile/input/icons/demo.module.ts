import {NgModule} from "@angular/core";
import {JigsawMobileInputModule} from "jigsaw/mobile_public_api";
import {InputPrefixIconDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [InputPrefixIconDemoComponent],
    exports: [InputPrefixIconDemoComponent],
    imports: [JigsawMobileInputModule, JigsawDemoDescriptionModule]
})
export class InputPrefixIconMobileDemoModule {

}
