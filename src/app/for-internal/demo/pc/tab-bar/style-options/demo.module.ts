import { NgModule } from "@angular/core";
import {
    JigsawTabsModule,
    JigsawButtonModule,
    JigsawHeaderModule
} from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { TabBarStyleOptionsDemoComponent } from "./demo.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        JigsawTabsModule,
        JigsawDemoDescriptionModule,
        JigsawButtonModule,
        JigsawHeaderModule
    ],
    declarations: [TabBarStyleOptionsDemoComponent],
    exports: [TabBarStyleOptionsDemoComponent]
})
export class TabBarStyleOptionsDemoModule { }
