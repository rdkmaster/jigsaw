import {NgModule} from '@angular/core';
import {JigsawTagModule} from "jigsaw/public_api";
import {TagSelectableComponent} from './demo.component';
import {CommonModule} from "@angular/common";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        JigsawTagModule,
        CommonModule,
        DemoTemplateModule
    ],
    declarations: [TagSelectableComponent],
    exports: [TagSelectableComponent]
})
export class TagSelectableDemoModule {
}
