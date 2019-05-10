import {NgModule} from '@angular/core';
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawMobileTabsModule} from "jigsaw/mobile-components/tabs/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawShowTabComponent} from './demo.component';

@NgModule({
    imports: [JigsawMobileTabsModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule],
    declarations: [JigsawShowTabComponent],
    exports: [JigsawShowTabComponent]
})
export class TabsShowTabDemoModule {
}
