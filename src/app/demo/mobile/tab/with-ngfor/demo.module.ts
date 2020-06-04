import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawMobileTabsModule} from "jigsaw/mobile_public_api";
import {JigsawMobileTabsWithNgForComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawMobileTabsModule, JigsawDemoDescriptionModule],
    declarations: [JigsawMobileTabsWithNgForComponent],
    exports: [JigsawMobileTabsWithNgForComponent]
})
export class TabsWithNgForDemoModule {
}
