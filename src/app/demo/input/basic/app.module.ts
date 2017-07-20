import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {InputBasicDemoComponent} from "./app.component";
@NgModule({
    declarations: [InputBasicDemoComponent],
    bootstrap: [ InputBasicDemoComponent ],
    imports: [JigsawInputModule]
})
export class InputBasicDemoModule{

}
