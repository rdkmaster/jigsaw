import {NgModule} from '@angular/core';
import {JigsawTagModule} from "jigsaw/public_api";
import {TagPresetColorComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTagModule, DemoTemplateModule],
    declarations: [TagPresetColorComponent],
    exports: [TagPresetColorComponent]
})
export class TagPresetColorDemoModule {
}
