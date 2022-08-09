import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioLiteModule, JigsawHeaderModule} from "jigsaw/public_api";

import { RadioLiteTypeDemoComponent } from "./demo.component";

@NgModule({
    declarations: [RadioLiteTypeDemoComponent],
    exports: [RadioLiteTypeDemoComponent],
    imports: [JigsawRadioLiteModule, CommonModule,  JigsawHeaderModule]
})
export class RadioLiteTypeDemoModule {

}
