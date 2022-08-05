import {NgModule} from "@angular/core";
import {FloatDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "../../../demo-description/demo-description";
import {JigsawFloatModule} from "../../../../jigsaw/common/directive/float/float";
import {FloatBasicDemoComponent} from "./basic/demo.component";
import {FloatInitDataDemoComponent} from "./init-data/demo.component";
import {UserComponent} from "./init-data/user-component/user-component";
import {FloatMultiLevelDemoComponent} from "./multi-level/demo.component";
import {JigsawMenuModule} from "../../../../jigsaw/pc-components/menu";
import {JigsawRadioModule} from "../../../../jigsaw/pc-components/radio/radios";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {FloatPositionDemoComponent} from "./position/demo.component";
import {FloatTargetDemoComponent} from "./target/demo.component";
import {JigsawButtonBarModule} from "../../../../jigsaw/pc-components/list-and-tile/button-bar";
import {FloatTriggerDemoComponent} from "./trigger/demo.component";
import {User1Component} from "./target/user-component/user-component";
import {JigsawTrustedHtmlModule} from "../../../../jigsaw/common/directive/trusted-html/trusted-html";
import {JigsawNumericInputModule} from "../../../../jigsaw/pc-components/input/numeric-input";
import {JigsawSelectModule} from "../../../../jigsaw/pc-components/select";
import {JigsawSwitchModule} from "../../../../jigsaw/pc-components/switch/switch";
import {FloatOptionDemoComponent} from "./option/demo.component";

@NgModule({
    declarations: [FloatDemoComponent, FloatBasicDemoComponent, FloatInitDataDemoComponent, UserComponent, FloatMultiLevelDemoComponent,
        FloatPositionDemoComponent, FloatTargetDemoComponent, FloatTriggerDemoComponent, User1Component, FloatOptionDemoComponent],
    imports: [DemoTemplateModule, JigsawMarkdownModule, CommonModule, JigsawDemoDescriptionModule, JigsawFloatModule, JigsawMenuModule,
        JigsawRadioModule, JigsawButtonModule, JigsawButtonBarModule, JigsawTrustedHtmlModule, JigsawNumericInputModule, JigsawSelectModule,
    JigsawSwitchModule]
})
export class FloatDemoModule {
}
