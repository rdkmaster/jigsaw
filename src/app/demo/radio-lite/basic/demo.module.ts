import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RadioLiteBasicDemoComponent} from "./demo.component";
import {JigsawRadioLiteModule} from "jigsaw/pc-components/radio/radio-lite";

@NgModule({
    declarations: [RadioLiteBasicDemoComponent],
    exports: [RadioLiteBasicDemoComponent],
    imports: [JigsawRadioLiteModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RadioLiteBasicDemoModule {

}
