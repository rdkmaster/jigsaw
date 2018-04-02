import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputSelectDemoComponent} from "./demo.component";

@NgModule({
    declarations: [InputSelectDemoComponent],
    exports: [InputSelectDemoComponent],
    imports: [JigsawInputModule, JigsawCheckBoxModule, JigsawDemoDescriptionModule]
})
export class InputSelectDemoModule {

}
