import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioLiteModule} from "jigsaw/public_api";

import {RadioLiteDisabledDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [RadioLiteDisabledDemoComponent],
    exports: [RadioLiteDisabledDemoComponent],
    imports: [JigsawRadioLiteModule, CommonModule,  JigsawHeaderModule]
})
export class RadioLiteDisabledDemoModule {

}
