import {NgModule} from "@angular/core";
import {JigsawCheckBoxModule, JigsawSwitchModule} from "jigsaw/public_api";
import {CheckBoxFullComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [CheckBoxFullComponent],
    exports: [CheckBoxFullComponent],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class CheckBoxFullModule {

}
