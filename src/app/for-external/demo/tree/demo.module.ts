import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../demo-template/demo-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import {JigsawTreeExtModule, JigsawInputModule} from "jigsaw/public_api";
import {ZtreeDemoComponent} from "./basic/demo.component";
import {ZtreeAllComponent} from "./demo.component";
import {ZtreeDemoEditableComponent} from "./editable/demo.component";
import {ZtreeFuzzySearchComponent} from "./fuzzy-search/demo.component";
import {ZTreeIconDemoComponent} from "./icon/demo.component";
import {ZTreeAsyncDemoComponent} from "./async/demo.component";
import {ZtreeXMLDataDemoComponent} from "./xml-data/demo.component";


@NgModule({
    declarations: [
        ZtreeAllComponent,
        ZtreeDemoComponent,
        ZtreeDemoEditableComponent,
        ZtreeFuzzySearchComponent,
        ZTreeIconDemoComponent,
        ZTreeAsyncDemoComponent,
        ZtreeXMLDataDemoComponent

    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawTreeExtModule,
        JigsawInputModule

    ]
})
export class ZtreeDemoModule {
}
