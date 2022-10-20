import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../demo-template/demo-template';
import { DocTemplateModule } from '../../doc-template/doc-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import {
    JigsawTileSelectModule,
    JigsawButtonModule,
    JigsawComboSelectModule,
    JigsawCollapseModule,
    JigsawSwitchModule,
    JigsawInputModule
} from "jigsaw/public_api";
import { ComboSelectComponent } from "./demo.component";
import { ComboSelectBasicDemo } from "./basic/demo.component";
import { CommonModule } from "@angular/common";
import { ComboSelectAutoWidthDemo } from "./auto-width/demo.component";
import { ComboDropDownStatusDemoComponent } from "./drop-down-status/demo.component";
import { ComboSelectChangeEventsDemoComponent } from "./events/demo.component";
import { ComboSelectMaxHeightDemoComponent } from "./max-height/demo.component";
import { ComboSelectSingleDemoComponent } from "./single/demo.component";
import { ComboSelectOpenDemoComponent } from "./open/demo.component";
import { ComboSelectSearchableDemoComponent } from "./searchable/demo.component";
import { ComboSelectSetWidthDemoComponent } from "./set-width/demo.component";
import { ComboSelectTextTagDemoComponent } from "./text-tag/demo.component";
import { ComboSelectTriggerDemoComponent } from "./trigger/demo.component";


@NgModule({
    declarations: [
        ComboSelectComponent,
        ComboSelectBasicDemo,
        ComboSelectAutoWidthDemo,
        ComboDropDownStatusDemoComponent,
        ComboSelectChangeEventsDemoComponent,
        ComboSelectMaxHeightDemoComponent,
        ComboSelectSingleDemoComponent,
        ComboSelectOpenDemoComponent,
        ComboSelectSearchableDemoComponent,
        ComboSelectSetWidthDemoComponent,
        ComboSelectTextTagDemoComponent,
        ComboSelectTriggerDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        JigsawMarkdownModule,
        JigsawTileSelectModule,
        JigsawButtonModule,
        JigsawComboSelectModule,
        CommonModule,
        JigsawCollapseModule,
        JigsawSwitchModule,
        JigsawInputModule

    ]
})
export class ComboSelectDemoModule {
}
