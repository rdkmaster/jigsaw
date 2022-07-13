import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTagModule, JigsawInputModule} from "jigsaw/public_api";
import {TagAddRemoveComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        CommonModule,
        JigsawTagModule,
        JigsawInputModule,
        DemoTemplateModule
    ],
    declarations: [TagAddRemoveComponent],
    exports: [TagAddRemoveComponent]
})
export class TagAddRemoveDemoModule {
}
