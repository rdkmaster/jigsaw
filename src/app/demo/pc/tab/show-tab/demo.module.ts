import {NgModule} from '@angular/core';
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawTabsModule} from "jigsaw/pc-components/tabs/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawShowTabComponent} from './demo.component';

@NgModule({
    imports: [JigsawTabsModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [JigsawShowTabComponent],
    exports: [JigsawShowTabComponent]
})
export class TabsShowTabDemoModule {
}
