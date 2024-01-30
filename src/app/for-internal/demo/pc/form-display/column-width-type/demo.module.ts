import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawFormDisplayModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "../../../../description/demo-description";
import {FormDisplayColumnWidthTypeDemoComponent} from "./demo.component";

@NgModule({
    declarations: [FormDisplayColumnWidthTypeDemoComponent],
    imports: [
        FormsModule, ReactiveFormsModule, CommonModule, JigsawFormDisplayModule, JigsawDemoDescriptionModule, JigsawButtonModule
    ],
    exports: [FormDisplayColumnWidthTypeDemoComponent]
})
export class FormDisplayColumnWidthTypeDemoModule {

}
