import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawComboSelectModule, JigsawRadioModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ComboSelectTriggerDemo} from "./demo.component";

@NgModule({
    declarations: [ComboSelectTriggerDemo],
    exports: [ComboSelectTriggerDemo],
    imports: [
        JigsawComboSelectModule, JigsawRadioModule,JigsawDemoDescriptionModule,JigsawButtonModule,CommonModule
    ]
})
export class ComboSelectTriggerDemoModule {
}
