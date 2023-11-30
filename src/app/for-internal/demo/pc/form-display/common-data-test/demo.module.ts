import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FormDisplayPerformanceTestDemoComponent} from "./demo.component";
import {JigsawFormDisplayModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "../../../../description/demo-description";

@NgModule({
    declarations: [FormDisplayPerformanceTestDemoComponent],
    imports: [
        FormsModule, ReactiveFormsModule, CommonModule, JigsawFormDisplayModule, JigsawDemoDescriptionModule
    ],
    exports: [FormDisplayPerformanceTestDemoComponent]
})
export class FormDisplayPerformanceTestDemoModule {

}
