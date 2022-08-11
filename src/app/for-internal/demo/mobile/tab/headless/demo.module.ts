import {NgModule} from '@angular/core';
import {
    JigsawMobileSwitchModule, JigsawMobileTabsModule, JigsawMobileButtonBarModule, JigsawMobileInputModule,
    JigsawMobileGraphModule
} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
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
