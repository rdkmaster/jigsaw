import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileRadioLiteModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RadioLiteBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [RadioLiteBasicDemoComponent],
    exports: [RadioLiteBasicDemoComponent],
    imports: [JigsawMobileRadioLiteModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RadioLiteBasicDemoModule {

}
