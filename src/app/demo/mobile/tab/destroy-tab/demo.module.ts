import {NgModule} from '@angular/core';
import {JigsawMobileTabsModule} from "jigsaw/mobile-components/tabs/index";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawDestoryTabComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawMobileTabsModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule],
    declarations: [JigsawDestoryTabComponent],
    exports: [JigsawDestoryTabComponent]
})
export class TabsDestroyDemoModule {
}
