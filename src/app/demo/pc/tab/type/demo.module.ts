import { NgModule } from "@angular/core";
import {
    JigsawTabsModule,
    JigsawButtonModule,
    JigsawHeaderModule
} from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { TabsTypeDemoComponent } from "./demo.component";

@NgModule({
    imports: [
        JigsawTabsModule,
        JigsawDemoDescriptionModule,
        JigsawButtonModule,
        JigsawHeaderModule,

    ],
    declarations: [TabsTypeDemoComponent],
    exports: [TabsTypeDemoComponent]
})
export class TabsTypeDemoModule {}
