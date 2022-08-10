import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioLiteModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import { RadioLiteTypeDemoComponent } from "./demo.component";

@NgModule({
    declarations: [RadioLiteTypeDemoComponent],
    exports: [RadioLiteTypeDemoComponent],
    imports: [JigsawRadioLiteModule, CommonModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class RadioLiteTypeDemoModule {

}
