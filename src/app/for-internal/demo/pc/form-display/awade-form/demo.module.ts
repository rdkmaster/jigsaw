import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TransFormCommonDemoComponent} from "./demo.component";
import {JigsawButtonModule, JigsawFormDisplayModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "../../../../description/demo-description";

@NgModule({
    declarations: [TransFormCommonDemoComponent],
    imports: [
        FormsModule, ReactiveFormsModule, CommonModule, JigsawFormDisplayModule, JigsawDemoDescriptionModule, JigsawButtonModule
    ],
    exports: [TransFormCommonDemoComponent]
})
export class TransformAwadeCommonDemoModule {
}
