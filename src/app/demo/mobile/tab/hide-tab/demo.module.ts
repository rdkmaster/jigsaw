import {NgModule} from '@angular/core';
import {JigsawMobileTabsModule} from "jigsaw/mobile-components/tabs/index";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawHideTabComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawMobileTabsModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule],
    declarations: [JigsawHideTabComponent],
    exports: [JigsawHideTabComponent]
})
export class TabsHideTabDemoModule {
}
