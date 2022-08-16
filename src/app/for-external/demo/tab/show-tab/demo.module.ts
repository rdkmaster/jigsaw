import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawTabsModule} from "jigsaw/public_api";

import {JigsawShowTabComponent} from './demo.component';

@NgModule({
    imports: [JigsawTabsModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [JigsawShowTabComponent],
    exports: [JigsawShowTabComponent]
})
export class TabsShowTabDemoModule {
}
