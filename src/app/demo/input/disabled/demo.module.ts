import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputDisabledComponent} from "./demo.component";

@NgModule({
    declarations: [InputDisabledComponent],
    exports: [InputDisabledComponent],
    imports: [JigsawInputModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class InputDisabledModule {
}
