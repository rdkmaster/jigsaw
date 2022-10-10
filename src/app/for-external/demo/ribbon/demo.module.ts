import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../demo-template/demo-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { JigsawRibbonModule } from "jigsaw/public_api";
import { RibbonAllComponent } from "./demo.component";
import { RibbonBasicDemoComponent } from './basic/demo.component';

@NgModule({
    declarations: [
        RibbonAllComponent,
        RibbonBasicDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawRibbonModule
    ]
})
export class RibbonDemoModule {
}
