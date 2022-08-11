import {NgModule} from '@angular/core';
import {JigsawTreeExtModule, JigsawHeaderModule} from "jigsaw/public_api";
import {ZtreeSizeComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [ZtreeSizeComponent],
    exports: [ZtreeSizeComponent]
})
export class TreeSizeDemoModule {
}
