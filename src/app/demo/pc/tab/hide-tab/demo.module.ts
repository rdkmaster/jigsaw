import {NgModule} from '@angular/core';
import {JigsawTabsModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawHideTabComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTabsModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [JigsawHideTabComponent],
    exports: [JigsawHideTabComponent]
})
export class TabsHideTabDemoModule {
}
