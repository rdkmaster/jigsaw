import { NgModule } from "@angular/core";
import { FloatDemoComponent } from "./demo.component";
import { DemoTemplateModule } from '../../demo-template/demo-template';
import { DocTemplateModule } from '../../doc-template/doc-template';
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { CommonModule } from "@angular/common";
import { FloatBasicDemoComponent } from "./basic/demo.component";
import { FloatInitDataDemoComponent } from "./init-data/demo.component";
import { UserComponent } from "./init-data/user-component/user-component";
import { FloatMultiLevelDemoComponent } from "./multi-level/demo.component";
import { JigsawMenuModule, JigsawRadioModule, JigsawFloatModule, JigsawTrustedHtmlModule, JigsawSelectModule, JigsawSwitchModule, JigsawNumericInputModule } from "jigsaw/public_api";
import { JigsawButtonModule } from "jigsaw/public_api";
import { FloatPositionDemoComponent } from "./position/demo.component";
import { FloatTargetDemoComponent } from "./target/demo.component";
import { JigsawButtonBarModule } from "jigsaw/public_api";
import { FloatTriggerDemoComponent } from "./trigger/demo.component";
import { User1Component } from "./target/user-component/user-component";
import { FloatOptionDemoComponent } from "./option/demo.component";

@NgModule({
    declarations: [
        FloatDemoComponent,
        FloatBasicDemoComponent,
        FloatInitDataDemoComponent,
        UserComponent,
        FloatMultiLevelDemoComponent,
        FloatPositionDemoComponent,
        FloatTargetDemoComponent,
        FloatTriggerDemoComponent,
        User1Component,
        FloatOptionDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        JigsawMarkdownModule,
        CommonModule,
        JigsawFloatModule,
        JigsawMenuModule,
        JigsawRadioModule,
        JigsawButtonModule,
        JigsawButtonBarModule,
        JigsawTrustedHtmlModule,
        JigsawNumericInputModule,
        JigsawSelectModule,
        JigsawSwitchModule
    ]
})
export class FloatDemoModule {
}
