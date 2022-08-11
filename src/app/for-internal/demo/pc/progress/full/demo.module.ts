import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawProgressModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ProgressFullComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [ProgressFullComponent],
    exports: [ProgressFullComponent],
    imports: [JigsawProgressModule, JigsawDemoDescriptionModule, CommonModule, JigsawNumericInputModule, JigsawHeaderModule]
})
export class ProgressFullModule {

}
