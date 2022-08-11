import {NgModule} from '@angular/core';
import {JigsawHeaderModule, JigsawTableModule} from "jigsaw/public_api";
import {TableFixedHeadDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [TableFixedHeadDemoComponent],
    exports: [TableFixedHeadDemoComponent]
})
export class TableFixedHeadDemoModule {
}
