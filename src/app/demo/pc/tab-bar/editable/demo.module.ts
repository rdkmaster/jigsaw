import { NgModule } from "@angular/core";
import {
    JigsawTabsModule,
    JigsawButtonModule,
    JigsawHeaderModule,
} from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import {TabBarEditableComponent} from "./demo.component";
import { CommonModule } from "@angular/common";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {JigsawMarkdownModule} from "../../../../markdown/markdown";

@NgModule({
    imports: [
        CommonModule,
        JigsawTabsModule,
        JigsawDemoDescriptionModule,
        JigsawButtonModule,
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawHeaderModule
    ],
    declarations: [TabBarEditableComponent],
    exports: [TabBarEditableComponent]
})
export class TabBarEditableDemoModule { }
