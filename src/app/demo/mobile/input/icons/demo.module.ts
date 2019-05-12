import {NgModule} from "@angular/core";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {InputPrefixIconDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [InputPrefixIconDemoComponent],
    exports: [InputPrefixIconDemoComponent],
    imports: [JigsawMobileInputModule, JigsawDemoDescriptionModule]
})
export class InputPrefixIconMobileDemoModule {

}
