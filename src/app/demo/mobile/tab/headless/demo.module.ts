import {NgModule} from '@angular/core';
import {JigsawMobileSwitchModule} from "jigsaw/mobile-components/switch";
import {JigsawMobileTabsModule} from "jigsaw/mobile-components/tabs/index";
import {JigsawMobileButtonBarModule} from "jigsaw/mobile-components/list-and-tile/button-bar";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {JigsawMobileGraphModule} from "jigsaw/mobile-components/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TabHeadlessDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawMobileTabsModule, JigsawMobileSwitchModule, JigsawDemoDescriptionModule, JigsawMobileButtonBarModule,
        JigsawMobileInputModule, JigsawMobileGraphModule
    ],
    declarations: [TabHeadlessDemoComponent],
    exports: [TabHeadlessDemoComponent]
})
export class TabHeadlessDemoModule {
}
