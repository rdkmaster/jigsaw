import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {InputValueChangeDemoComponent} from "./app.component";
@NgModule({
    declarations: [InputValueChangeDemoComponent],
    bootstrap: [ InputValueChangeDemoComponent ],
    imports: [JigsawInputModule]
})
export class InputValueChangeDemoModule{

}
