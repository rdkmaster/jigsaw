import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {InputClearableDemoComponent} from "./app.component";
@NgModule({
    declarations: [InputClearableDemoComponent],
    bootstrap: [ InputClearableDemoComponent ],
    imports: [JigsawInputModule]
})
export class InputClearableDemoModule{

}
