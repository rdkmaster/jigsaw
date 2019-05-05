import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputDisabledComponent} from "./demo.component";

@NgModule({
    declarations: [InputDisabledComponent],
    exports: [InputDisabledComponent],
    imports: [JigsawInputModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class InputDisabledModule {
}
