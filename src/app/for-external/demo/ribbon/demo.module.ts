import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { JigsawRibbonModule } from "jigsaw/public_api";
import { RibbonAllComponent } from "./demo.component";
import { RibbonBasicDemoComponent } from './basic/demo.component';
import { RibbonColorDemoComponent } from './color/demo.component';
import { RibbonPositionDemoComponent } from './position/demo.component';
import { RibbonCursorDemoComponent } from './cursor/demo.component';

@NgModule({
    declarations: [
        RibbonAllComponent,
        RibbonBasicDemoComponent,
        RibbonColorDemoComponent,
        RibbonPositionDemoComponent,
        RibbonCursorDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        JigsawMarkdownModule,
        JigsawRibbonModule
    ]
})
export class RibbonDemoModule {
}
