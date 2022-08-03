import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../../demo/demo-template/demo-template';
import { JigsawMarkdownModule } from '../../../markdown/markdown';
import {AdjustFontColorAllDemoComponent} from "./demo.component";
import {JigsawButtonModule, JigsawHeaderModule, JigsawInputModule, JigsawTagModule, JigsawColorSelectModule} from "jigsaw/public_api";
import { CommonModule } from '@angular/common';
import {AdjustFontColorDemoComponent} from "./basic/demo.component";

@NgModule({
    declarations: [
        AdjustFontColorAllDemoComponent,
        AdjustFontColorDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawButtonModule,
        JigsawHeaderModule,
        JigsawInputModule,
        JigsawTagModule,
        JigsawColorSelectModule,
        CommonModule

    ]
})
export class AdjustFontColorDemoModule {
}
