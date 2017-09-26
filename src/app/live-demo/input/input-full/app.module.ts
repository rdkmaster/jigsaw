import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {InputFullComponent} from "./app.component";
import {JigsawButtonModule} from "jigsaw/component/button/button";
@NgModule({
    declarations: [InputFullComponent],
    bootstrap: [ InputFullComponent ],
    imports: [JigsawInputModule, JigsawButtonModule]
})
export class InputFullModule{

}
