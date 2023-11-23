import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FormDisplayTooltipDemoComponent} from "./demo.component";
import {JigsawButtonModule, JigsawFormDisplayModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "../../../../description/demo-description";

@NgModule({
    declarations: [FormDisplayTooltipDemoComponent],
    imports: [
        FormsModule, ReactiveFormsModule, CommonModule, JigsawFormDisplayModule, JigsawDemoDescriptionModule, JigsawButtonModule, JigsawSwitchModule
    ],
    exports: [FormDisplayTooltipDemoComponent]
})
export class FormDisplayTooltipDemoModule {

}
