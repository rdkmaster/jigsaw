import {NgModule} from "@angular/core";
import {JigsawInputModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputDisabledComponent} from "./demo.component";

@NgModule({
    declarations: [InputDisabledComponent],
    exports: [InputDisabledComponent],
    imports: [JigsawInputModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class InputDisabledModule {
}
