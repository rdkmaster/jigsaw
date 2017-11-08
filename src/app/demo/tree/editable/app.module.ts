import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/component/tree/tree-ext";
import {ZtreeDemoEditableComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule],
    declarations: [ZtreeDemoEditableComponent],
    bootstrap: [ZtreeDemoEditableComponent]
})
export class TreeEditableDemoModule {
}
