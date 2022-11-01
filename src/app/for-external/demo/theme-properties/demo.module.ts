import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { DemoNavigationModule } from '../../template/demo-navigation/demo-navigation';
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
        DocFooterTemplateModule,
        DemoNavigationModule,
        JigsawMarkdownModule,
        JigsawButtonModule,
        CommonModule
    ]
})
export class ThemePropertiesDemoModule {
}
