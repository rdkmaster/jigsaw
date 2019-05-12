import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/pc-components/tree/tree-ext";
import {ZtreeDemoEditableComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule],
    declarations: [ZtreeDemoEditableComponent],
    exports: [ZtreeDemoEditableComponent]
})
export class TreeEditableDemoModule {
}
