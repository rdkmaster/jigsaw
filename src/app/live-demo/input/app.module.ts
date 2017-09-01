import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {InputLiveDemoComponent} from "./app.component";
@NgModule({
    declarations: [InputLiveDemoComponent],
    bootstrap: [ InputLiveDemoComponent ],
    imports: [JigsawInputModule]
})
export class InputLiveDemoModule{

}
