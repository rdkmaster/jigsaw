import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {InputBasicDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [InputBasicDemoComponent],
    exports: [InputBasicDemoComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputBasicDemoModule {

}
