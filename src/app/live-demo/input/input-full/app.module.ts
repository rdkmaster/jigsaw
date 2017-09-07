import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {InputFullComponent} from "./app.component";
@NgModule({
    declarations: [InputFullComponent],
    bootstrap: [ InputFullComponent ],
    imports: [JigsawInputModule]
})
export class InputFullModule{

}
