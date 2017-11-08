import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputValueChangeDemoComponent} from "./app.component";

@NgModule({
    declarations: [InputValueChangeDemoComponent],
    bootstrap: [InputValueChangeDemoComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputValueChangeDemoModule {

}
