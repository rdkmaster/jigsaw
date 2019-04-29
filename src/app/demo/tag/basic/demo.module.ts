import {NgModule} from '@angular/core';
import {JigsawTagModule} from "jigsaw/pc-components/tag/tag";
import {TagBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";

@NgModule({
    imports: [JigsawTagModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [TagBasicDemoComponent],
    exports: [TagBasicDemoComponent]
})
export class TagBasicDemoModule {
}
