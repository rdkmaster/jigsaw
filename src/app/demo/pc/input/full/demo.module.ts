import {NgModule} from "@angular/core";
import {JigsawInputModule, JigsawButtonModule} from "jigsaw/public_api";
import {InputFullComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "../../../../demo-description/demo-description";

@NgModule({
    declarations: [InputFullComponent],
    exports: [InputFullComponent],
    imports: [JigsawInputModule, JigsawButtonModule, JigsawHeaderModule, JigsawDemoDescriptionModule]
})
export class InputFullModule {

}
