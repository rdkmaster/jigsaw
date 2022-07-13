import {NgModule} from '@angular/core';
import {JigsawTreeExtModule, JigsawInputModule} from "jigsaw/public_api";
import {ZtreeFuzzySearchComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule, JigsawInputModule, DemoTemplateModule],
    declarations: [ZtreeFuzzySearchComponent],
    exports: [ZtreeFuzzySearchComponent]
})
export class TreeFuzzySearchDemoModule {
}
