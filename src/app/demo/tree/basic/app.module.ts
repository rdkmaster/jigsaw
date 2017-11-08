import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/component/tree/tree-ext";
import {ZtreeDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule],
    declarations: [ZtreeDemoComponent],
    bootstrap: [ZtreeDemoComponent]
})
export class TreeBasicDemoModule {
}
