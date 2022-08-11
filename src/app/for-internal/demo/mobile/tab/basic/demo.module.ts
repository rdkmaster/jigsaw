import {NgModule} from '@angular/core';
import {JigsawMobileTabsModule, JigsawMobileButtonModule, JigsawMobileInputModule, JigsawMobileGraphModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
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
