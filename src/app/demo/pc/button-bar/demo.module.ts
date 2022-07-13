import { NgModule } from "@angular/core";
import {ButtonBarAllComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {CommonModule} from "@angular/common";
import {JigsawTabsModule} from "../../../../jigsaw/pc-components/tabs";
import {ButtonBarBasicComponent} from "./basic/demo.component";
import {JigsawButtonBarModule} from "../../../../jigsaw/pc-components/list-and-tile/button-bar";
import {JigsawSwitchModule} from "../../../../jigsaw/pc-components/switch/switch";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {JigsawRadioLiteModule} from "../../../../jigsaw/pc-components/radio/radio-lite";
import {ButtonBarBlueBackgroundComponent} from "./blue/demo.component";
import {ButtonBarSetHeightComponent} from "./set-height/demo.component";

@NgModule({
    imports: [
        JigsawMarkdownModule,
        DemoTemplateModule,
        CommonModule,
        JigsawTabsModule,
        JigsawButtonBarModule,
        JigsawSwitchModule,
        JigsawButtonModule,
        JigsawRadioLiteModule
    ],
    declarations: [
        ButtonBarAllComponent,
        ButtonBarBasicComponent,
        ButtonBarBlueBackgroundComponent,
        ButtonBarSetHeightComponent
    ],
    exports: [ButtonBarAllComponent]
})
export class ButtonBarAllModule {}
