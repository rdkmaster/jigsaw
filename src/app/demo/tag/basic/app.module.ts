import {NgModule} from '@angular/core';
import {JigsawTagModule} from "jigsaw/component/tag/tag";
import {TagBasicDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTagModule, JigsawDemoDescriptionModule],
    declarations: [TagBasicDemoComponent],
    bootstrap: [TagBasicDemoComponent]
})
export class TagBasicDemoModule {
}
