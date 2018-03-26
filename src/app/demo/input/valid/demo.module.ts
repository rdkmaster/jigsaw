import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputValidComponent} from "./demo.component";

@NgModule({
    declarations: [InputValidComponent],
    exports: [InputValidComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputValidModule {
}
