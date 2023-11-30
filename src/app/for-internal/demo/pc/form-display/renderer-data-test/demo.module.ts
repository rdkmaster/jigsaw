import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FormDisplayRendererDataTestDemoComponent} from "./demo.component";
import {JigsawFormDisplayModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "../../../../description/demo-description";

@NgModule({
    declarations: [FormDisplayRendererDataTestDemoComponent],
    imports: [
        FormsModule, ReactiveFormsModule, CommonModule, JigsawFormDisplayModule, JigsawDemoDescriptionModule, JigsawNumericInputModule
    ],
    exports: [FormDisplayRendererDataTestDemoComponent]
})
export class FormDisplayRendererDataTestDemoModule {

}
