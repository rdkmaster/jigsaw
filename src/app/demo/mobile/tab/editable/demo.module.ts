import {NgModule} from '@angular/core';
import {JigsawMobileTabsModule, JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
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
