import {NgModule} from '@angular/core';
import {JigsawTagModule, JigsawButtonModule} from "jigsaw/public_api";
import {TagBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTagModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [TagBasicDemoComponent],
    exports: [TagBasicDemoComponent]
})
export class TagBasicDemoModule {
}
