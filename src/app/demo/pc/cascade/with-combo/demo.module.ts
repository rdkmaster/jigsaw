import {NgModule} from "@angular/core";
import {JigsawCascadeModule, JigsawComboSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeWithComboDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [CascadeWithComboDemoComponent],
    exports: [CascadeWithComboDemoComponent],
    imports: [JigsawCascadeModule, JigsawComboSelectModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class CascadeWithComboDemoModule {
}
