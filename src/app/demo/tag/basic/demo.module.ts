import {NgModule} from '@angular/core';
import {JigsawTagModule} from "jigsaw/component/tag/tag";
import {TagBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTagModule, JigsawDemoDescriptionModule],
    declarations: [TagBasicDemoComponent],
    exports: [TagBasicDemoComponent]
})
export class TagBasicDemoModule {
}
