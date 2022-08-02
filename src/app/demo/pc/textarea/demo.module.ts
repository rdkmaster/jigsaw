import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../../demo/demo-template/demo-template';
import { JigsawMarkdownModule } from '../../../markdown/markdown';
import {TextareaAllComponent} from "./demo.component";
import {JigsawTextareaModule} from "jigsaw/public_api";
import {TextareaBasicDemoComponent} from "./basic/demo.component";


@NgModule({
    declarations: [
        TextareaAllComponent,
        TextareaBasicDemoComponent

    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawTextareaModule
    ]
})
export class TextareaDemoModule {
}
