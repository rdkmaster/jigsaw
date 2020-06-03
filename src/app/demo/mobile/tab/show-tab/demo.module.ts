import {NgModule} from '@angular/core';
import {JigsawMobileButtonModule, JigsawMobileTabsModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawShowTabComponent} from './demo.component';

@NgModule({
    imports: [JigsawMobileTabsModule, JigsawMobileButtonModule, JigsawDemoDescriptionModule],
    declarations: [JigsawShowTabComponent],
    exports: [JigsawShowTabComponent]
})
export class TabsShowTabDemoModule {
}
