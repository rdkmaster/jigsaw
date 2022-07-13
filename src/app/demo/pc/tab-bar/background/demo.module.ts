import { NgModule } from "@angular/core";
import {
    JigsawTabsModule,
    JigsawButtonModule,
    JigsawHeaderModule
} from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import {TabBarBackgroundComponent} from "./demo.component";
import { CommonModule } from "@angular/common";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        CommonModule,
        JigsawTabsModule,
        JigsawDemoDescriptionModule,
        JigsawButtonModule,
        JigsawHeaderModule,
        DemoTemplateModule,
    ],
    declarations: [TabBarBackgroundComponent],
    exports: [TabBarBackgroundComponent]
})
export class TabBarBackgroundDemoModule { }
