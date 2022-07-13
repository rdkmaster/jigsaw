import {NgModule} from '@angular/core';
import {JigsawTagModule, JigsawHeaderModule, JigsawButtonModule} from "jigsaw/public_api";
import {TagWithIconComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTagModule, JigsawHeaderModule, DemoTemplateModule, JigsawButtonModule],
    declarations: [TagWithIconComponent],
    exports: [TagWithIconComponent]
})
export class TagWithIconDemoModule {
}
