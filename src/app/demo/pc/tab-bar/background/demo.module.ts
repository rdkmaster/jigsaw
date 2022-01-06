import { NgModule } from "@angular/core";
import {
    JigsawTabsModule,
    JigsawButtonModule,
    JigsawHeaderModule
} from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { TabBarBackgroundDemoComponent } from "./demo.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        JigsawTabsModule,
        JigsawDemoDescriptionModule,
        JigsawButtonModule,
        JigsawHeaderModule
    ],
    declarations: [TabBarBackgroundDemoComponent],
    exports: [TabBarBackgroundDemoComponent]
})
export class TabBarBackgroundDemoModule { }
