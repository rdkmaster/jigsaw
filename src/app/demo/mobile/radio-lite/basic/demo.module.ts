import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RadioLiteBasicDemoComponent} from "./demo.component";
import {JigsawMobileRadioLiteModule} from "jigsaw/mobile-components/radio/radio-lite";

@NgModule({
    declarations: [RadioLiteBasicDemoComponent],
    exports: [RadioLiteBasicDemoComponent],
    imports: [JigsawMobileRadioLiteModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RadioLiteBasicDemoModule {

}
