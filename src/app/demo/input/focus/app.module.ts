import {NgModule} from "@angular/core";
import {InputFocusDemoComponent} from "./app.component";
import {JigsawInputModule} from "../../../../jigsaw/component/input/input";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
@NgModule({
    declarations: [InputFocusDemoComponent],
    imports: [JigsawInputModule,JigsawButtonModule]
})
export class InputFocusDemoModule{

}
