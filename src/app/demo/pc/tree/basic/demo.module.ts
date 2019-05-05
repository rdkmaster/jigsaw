import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/pc-components/tree/tree-ext";
import {ZtreeDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule],
    declarations: [ZtreeDemoComponent],
    exports: [ZtreeDemoComponent]
})
export class TreeBasicDemoModule {
}
