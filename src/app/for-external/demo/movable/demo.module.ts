import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../demo-template/demo-template';
import { DocTemplateModule } from '../../doc-template/doc-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { MovableAllComponent } from "./demo.component";
import { JigsawMovableModule, JigsawAlertModule, JigsawButtonModule } from "jigsaw/public_api";
import { MoveAndClickBasicDemoComponent } from "./basic/demo.component";

@NgModule({
    declarations: [
        MovableAllComponent,
        MoveAndClickBasicDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        JigsawMarkdownModule,
        JigsawMovableModule,
        JigsawAlertModule,
        JigsawButtonModule
    ]
})
export class MovableDemoModule {
}
