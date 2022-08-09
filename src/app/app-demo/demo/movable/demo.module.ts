import {NgModule} from "@angular/core";
import {DemoTemplateModule} from '../../../demo-template/demo-template';
import {JigsawMarkdownModule} from '../../../markdown/markdown';
import {MovableAllComponent} from "./demo.component";
import {JigsawMovableModule, JigsawAlertModule, JigsawButtonModule} from "jigsaw/public_api";
import {MoveAndClickBasicDemoComponent} from "./move-and-click/demo.component";

@NgModule({
    declarations: [
        MovableAllComponent,
        MoveAndClickBasicDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawMovableModule,
        JigsawAlertModule,
        JigsawButtonModule

    ]
})
export class MovableDemoModule {
}
