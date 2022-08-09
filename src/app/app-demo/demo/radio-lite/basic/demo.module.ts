import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioLiteModule} from "jigsaw/public_api";

import {RadioLiteBasicDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [RadioLiteBasicDemoComponent],
    exports: [RadioLiteBasicDemoComponent],
    imports: [JigsawRadioLiteModule, CommonModule,  JigsawHeaderModule]
})
export class RadioLiteBasicDemoModule {

}
