import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {InputDemoComponent} from "./app.component";
@NgModule({
    declarations: [InputDemoComponent],
    bootstrap: [ InputDemoComponent ],
    imports: [JigsawInputModule]
})
export class InputDemoModule{

}
