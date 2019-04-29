import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputFullComponent} from "./demo.component";

@NgModule({
    declarations: [InputFullComponent],
    exports: [InputFullComponent],
    imports: [JigsawInputModule, JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class InputFullModule {

}
