import {NgModule} from '@angular/core';
import {JigsawTagModule, JigsawButtonModule} from "jigsaw/public_api";
import {TagBasicComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTagModule, JigsawButtonModule, DemoTemplateModule],
    declarations: [TagBasicComponent],
    exports: [TagBasicComponent]
})
export class TagBasicDemoModule {
}
