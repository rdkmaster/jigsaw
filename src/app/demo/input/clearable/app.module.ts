import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputClearableDemoComponent} from "./app.component";

@NgModule({
    declarations: [InputClearableDemoComponent],
    exports: [InputClearableDemoComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputClearableDemoModule {

}
