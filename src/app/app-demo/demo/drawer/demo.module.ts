import {NgModule} from "@angular/core";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {JigsawMarkdownModule} from "../../markdown/markdown";
import {JigsawDrawerModule, JigsawRadioModule, JigsawButtonModule, JigsawSwitchModule, JigsawTabsModule} from "jigsaw/public_api";
import {DrawerAllComponent} from "./demo.component";
import {DrawerBasicDemoComponent} from "./basic/demo.component";
import {CommonModule} from "@angular/common";
import {DrawerInDrawerDemoComponent} from "./drawer-in-drawer/demo.component";
import {DrawerWithScrollbarDemoComponent} from "./with-scrollbar/demo.component";
import {DrawerWithTabDemoComponent} from "./with-tab/demo.component";
import {DrawerWithDivDemoComponent} from "./with-div/demo.component";
import {DrawerEmphasisHandlerDemoComponent} from "./emphasis-handler/demo.component";
@NgModule({
    declarations: [
        DrawerAllComponent,
        DrawerBasicDemoComponent,
        DrawerInDrawerDemoComponent,
        DrawerWithScrollbarDemoComponent,
        DrawerWithTabDemoComponent,
        DrawerWithDivDemoComponent,
        DrawerEmphasisHandlerDemoComponent

    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawDrawerModule,
        JigsawRadioModule,
        JigsawButtonModule,
        JigsawSwitchModule,
        CommonModule,
        JigsawTabsModule
    ]
})
export class DrawerDemoModule {
}
