import {NgModule} from '@angular/core';
import {JigsawMobileTabsModule} from "jigsaw/mobile-components/tabs/index";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {JigsawMobileGraphModule} from "jigsaw/mobile-components/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawMobileTabsDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawMobileTabsModule, JigsawMobileButtonModule, JigsawMobileInputModule, JigsawDemoDescriptionModule, JigsawMobileGraphModule
    ],
    declarations: [JigsawMobileTabsDemoComponent],
    exports: [JigsawMobileTabsDemoComponent]
})
export class TabsBasicDemoModule {
}
