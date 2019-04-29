import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/pc-components/tree/tree-ext";
import {ZtreeAsynDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule],
    declarations: [ZtreeAsynDemoComponent],
    exports: [ZtreeAsynDemoComponent]
})
export class TreeAsyncDemoModule {
}
