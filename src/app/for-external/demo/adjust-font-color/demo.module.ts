import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { DemoNavigationModule } from '../../template/demo-navigation/demo-navigation';
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { AdjustFontColorAllDemoComponent } from "./demo.component";
import {
    JigsawButtonModule,
    JigsawHeaderModule,
    JigsawInputModule,
    JigsawTagModule,
    JigsawColorSelectModule,
} from "jigsaw/public_api";
import { CommonModule } from "@angular/common";
import { AdjustFontColorDemoComponent } from "./basic/demo.component";

@NgModule({
    declarations: [
        AdjustFontColorAllDemoComponent,
        AdjustFontColorDemoComponent,
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        DemoNavigationModule,
        JigsawMarkdownModule,
        JigsawButtonModule,
        JigsawHeaderModule,
        JigsawInputModule,
        JigsawTagModule,
        JigsawColorSelectModule,
        CommonModule,
    ],
})
export class AdjustFontColorDemoModule { }
