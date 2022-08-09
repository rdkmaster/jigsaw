import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../../demo-template/demo-template';
import { JigsawMarkdownModule } from '../../../markdown/markdown';
import {
    JigsawTabsModule, JigsawProgressModule, JigsawInputModule, JigsawTableModule,
    JigsawGraphModule, JigsawButtonModule, JigsawSwitchModule, JigsawButtonBarModule, JigsawHeaderModule
} from "jigsaw/public_api";
import {TabAllComponent} from "./demo.component";
import {JigsawTabsDemoComponent} from "./basic/demo.component";
import {TabsEditableDemoComponent} from "./editable/demo.component";
import {TabsBackgroundDemoComponent} from "./background/demo.component";
import {TabHeadlessDemoComponent} from "./headless/demo.component";
import {JigsawHideShowTabComponent} from "./hide-show/demo.component";
import {CommonModule} from "@angular/common";
import {TabsTitleRendererComponent} from "./title-renderer/demo.component";
import {TabsTypeDemoComponent} from "./type/demo.component";
import {TabTabBarComponent} from "./tab-bar/demo.component";

@NgModule({
    declarations: [
        TabAllComponent,
        JigsawTabsDemoComponent,
        TabsEditableDemoComponent,
        TabsBackgroundDemoComponent,
        TabHeadlessDemoComponent,
        JigsawHideShowTabComponent,
        TabsTitleRendererComponent,
        TabsTypeDemoComponent,
        TabTabBarComponent,
        TabTabBarComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawTabsModule,
        JigsawProgressModule,
        JigsawInputModule,
        JigsawTableModule,
        JigsawGraphModule,
        JigsawButtonModule,
        JigsawSwitchModule,
        JigsawButtonBarModule,
        CommonModule,
        JigsawHeaderModule,
    ]
})
export class TabsDemoModule {
}
