import { NgModule } from "@angular/core";
import {
    JigsawTabsModule,
    JigsawButtonModule,
    JigsawHeaderModule
} from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { TabBarEditableDemoComponent } from "./demo.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        JigsawTabsModule,
        JigsawDemoDescriptionModule,
        JigsawButtonModule,
        JigsawHeaderModule
    ],
    declarations: [TabBarEditableDemoComponent],
    exports: [TabBarEditableDemoComponent]
})
export class TabBarEditableDemoModule { }
