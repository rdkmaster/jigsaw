import {NgModule} from '@angular/core';
import {JigsawMobileTabsModule, JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {JigsawHideTabComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawMobileTabsModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule],
    declarations: [JigsawHideTabComponent],
    exports: [JigsawHideTabComponent]
})
export class TabsHideTabDemoModule {
}
