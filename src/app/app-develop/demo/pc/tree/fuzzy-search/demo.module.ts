import {NgModule} from '@angular/core';
import {JigsawTreeExtModule, JigsawInputModule} from "jigsaw/public_api";
import {ZtreeFuzzySearchComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule, JigsawInputModule],
    declarations: [ZtreeFuzzySearchComponent],
    exports: [ZtreeFuzzySearchComponent]
})
export class TreeFuzzySearchDemoModule {
}
