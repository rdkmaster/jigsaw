import {NgModule} from "@angular/core";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputClearableDemoComponent} from "./demo.component";

@NgModule({
    declarations: [InputClearableDemoComponent],
    exports: [InputClearableDemoComponent],
    imports: [JigsawMobileInputModule, JigsawDemoDescriptionModule]
})
export class InputClearableDemoModule {

}
