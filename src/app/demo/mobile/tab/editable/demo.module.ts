import {NgModule} from '@angular/core';
import {JigsawMobileTabsModule} from "jigsaw/mobile-components/tabs/index";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TabsEditableDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawMobileTabsModule, JigsawDemoDescriptionModule, JigsawMobileButtonModule
    ],
    declarations: [TabsEditableDemoComponent],
    exports: [TabsEditableDemoComponent],
})
export class TabsEditableDemoModule {
}
