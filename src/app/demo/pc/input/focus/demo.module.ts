import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputFocusDemoComponent} from "./demo.component";

@NgModule({
    declarations: [InputFocusDemoComponent],
    exports: [InputFocusDemoComponent],
    imports: [JigsawInputModule, JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class InputFocusDemoModule {

}
