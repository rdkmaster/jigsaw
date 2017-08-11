import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawButtonModule} from "jigsaw/component/button/button";

import {TemplateDrivenDemoComponent} from "./app.component";

@NgModule({
    imports: [JigsawInputModule, JigsawCheckBoxModule, JigsawButtonModule, FormsModule, ReactiveFormsModule, CommonModule],
    declarations: [TemplateDrivenDemoComponent],
    bootstrap: [TemplateDrivenDemoComponent],
    entryComponents: []
})
export class TemplateDrivenDemoModule {

}
