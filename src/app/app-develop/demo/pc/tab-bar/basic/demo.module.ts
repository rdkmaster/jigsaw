import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
    JigsawButtonModule,
    JigsawGraphModule,
    JigsawMenuModule,
    JigsawSwitchModule,
    JigsawTableModule,
    JigsawTabsModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {JigsawTabBarComponent} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawTabsModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawTableModule, JigsawGraphModule,
        JigsawButtonModule, JigsawMenuModule
    ],
    declarations: [JigsawTabBarComponent],
    exports: [JigsawTabBarComponent]
})
export class JigsawTabBarDemoModule {
}
