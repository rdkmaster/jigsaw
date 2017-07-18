import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {InputFocusDemoComponent} from "./app.component";
@NgModule({
    declarations: [InputFocusDemoComponent],
    imports: [JigsawInputModule,JigsawButtonModule]
})
export class InputFocusDemoModule{

}
