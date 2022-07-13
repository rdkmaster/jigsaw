import {NgModule} from '@angular/core';
import {JigsawTagModule, JigsawButtonModule, JigsawHeaderModule} from "jigsaw/public_api";
import {TagPresetColorDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTagModule, JigsawDemoDescriptionModule, JigsawButtonModule, JigsawHeaderModule],
    declarations: [TagPresetColorDemoComponent],
    exports: [TagPresetColorDemoComponent]
})
export class TagPresetColorDemoModule {
}
