import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioLiteModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RadioLiteBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [RadioLiteBasicDemoComponent],
    exports: [RadioLiteBasicDemoComponent],
    imports: [JigsawRadioLiteModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RadioLiteBasicDemoModule {

}
