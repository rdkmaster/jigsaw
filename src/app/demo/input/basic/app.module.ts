import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {InputBasicDemoComponent} from "./app.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [InputBasicDemoComponent],
    bootstrap: [InputBasicDemoComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputBasicDemoModule {

}
