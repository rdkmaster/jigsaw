import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawHeaderModule, JigsawNumericInputModule, JigsawTreeExtModule} from "jigsaw/public_api";
import {ZtreeBigDataDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule, JigsawNumericInputModule, JigsawHeaderModule, JigsawButtonModule],
    declarations: [ZtreeBigDataDemoComponent],
    exports: [ZtreeBigDataDemoComponent]
})
export class TreeBigDataDemoModule {
}
