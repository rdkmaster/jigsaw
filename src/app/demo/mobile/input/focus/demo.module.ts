import {NgModule} from "@angular/core";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputFocusDemoComponent} from "./demo.component";

@NgModule({
    declarations: [InputFocusDemoComponent],
    exports: [InputFocusDemoComponent],
    imports: [JigsawMobileInputModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule]
})
export class InputFocusDemoModule {

}
