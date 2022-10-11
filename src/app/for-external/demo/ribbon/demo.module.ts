import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../demo-template/demo-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { JigsawRibbonModule } from "jigsaw/public_api";
import { RibbonAllComponent } from "./demo.component";
import { RibbonBasicDemoComponent } from './basic/demo.component';
import { RibbonColorDemoComponent } from './color/demo.component';
import { RibbonPositionDemoComponent } from './position/demo.component';

@NgModule({
    declarations: [
        RibbonAllComponent,
        RibbonBasicDemoComponent,
        RibbonColorDemoComponent,
        RibbonPositionDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawRibbonModule
    ]
})
export class RibbonDemoModule {
}
