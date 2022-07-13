import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
    JigsawButtonModule,
    JigsawGraphModule,
    JigsawHeaderModule,
    JigsawMenuModule,
    JigsawSwitchModule,
    JigsawTableModule,
    JigsawTabsModule
} from "jigsaw/public_api";
import {TabBarBasicComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {JigsawMarkdownModule} from "../../../../markdown/markdown";

@NgModule({
    imports: [
        CommonModule, JigsawTabsModule, JigsawSwitchModule, JigsawTableModule, JigsawGraphModule,
        JigsawButtonModule, JigsawMenuModule, DemoTemplateModule, JigsawHeaderModule, JigsawMarkdownModule
    ],
    declarations: [TabBarBasicComponent],
    exports: [TabBarBasicComponent]
})
export class TabBarBasicDemoModule {
}
