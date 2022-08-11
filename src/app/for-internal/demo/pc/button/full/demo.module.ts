import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawCheckBoxModule, JigsawLoadingModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ButtonFullComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [ButtonFullComponent],
    exports: [ButtonFullComponent],
    imports: [JigsawButtonModule, JigsawCheckBoxModule, JigsawLoadingModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class ButtonFullModule {

}
