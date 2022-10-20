import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { JigsawButtonModule } from "jigsaw/public_api";
import { CommonModule } from '@angular/common';
import { ThemePropertiesAllComponent } from "./demo.component";
import { ThemePropertiesBasicDemoComponent } from "./basic/demo.component";

@NgModule({
    declarations: [
        ThemePropertiesAllComponent,
        ThemePropertiesBasicDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        JigsawMarkdownModule,
        JigsawButtonModule,
        CommonModule
    ]
})
export class ThemePropertiesDemoModule {
}
