import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FormDisplayCommonDemoComponent} from "./demo.component";
import {JigsawButtonModule, JigsawFormDisplayModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "../../../../description/demo-description";

@NgModule({
    declarations: [FormDisplayCommonDemoComponent],
    imports: [
        FormsModule, ReactiveFormsModule, CommonModule, JigsawFormDisplayModule, JigsawDemoDescriptionModule, JigsawButtonModule
    ],
    exports: [FormDisplayCommonDemoComponent]
})
export class FormDisplayCommonDemoModule {

}
