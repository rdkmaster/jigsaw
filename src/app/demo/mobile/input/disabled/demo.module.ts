import {NgModule} from "@angular/core";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {JigsawMobileSwitchModule} from "jigsaw/mobile-components/switch/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputDisabledComponent} from "./demo.component";

@NgModule({
    declarations: [InputDisabledComponent],
    exports: [InputDisabledComponent],
    imports: [JigsawMobileInputModule, JigsawMobileSwitchModule, JigsawDemoDescriptionModule]
})
export class InputDisabledModule {
}
