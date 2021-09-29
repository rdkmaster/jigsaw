import {NgModule} from '@angular/core';
import {JigsawTreeExtModule, JigsawInputModule} from "jigsaw/public_api";
import {ZtreeFindNodeComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule, JigsawInputModule],
    declarations: [ZtreeFindNodeComponent],
    exports: [ZtreeFindNodeComponent]
})
export class TreeFindNodeDemoModule {
}
