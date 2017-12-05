import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/component/tree/tree-ext";
import {ZtreeAsynDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule],
    declarations: [ZtreeAsynDemoComponent],
    exports: [ZtreeAsynDemoComponent]
})
export class TreeAsyncDemoModule {
}
