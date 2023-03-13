import {NgModule} from '@angular/core';
import {JigsawTagModule, JigsawButtonModule, JigsawHeaderModule, JigsawInputModule} from "jigsaw/public_api";
import {TagBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTagModule, JigsawDemoDescriptionModule, JigsawButtonModule, JigsawHeaderModule,
        JigsawInputModule],
    declarations: [TagBasicDemoComponent],
    exports: [TagBasicDemoComponent]
})
export class TagBasicDemoModule {
}
