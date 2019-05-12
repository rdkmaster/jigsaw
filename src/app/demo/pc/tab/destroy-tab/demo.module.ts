import {NgModule} from '@angular/core';
import {JigsawTabsModule} from "jigsaw/pc-components/tabs/index";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDestoryTabComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTabsModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [JigsawDestoryTabComponent],
    exports: [JigsawDestoryTabComponent]
})
export class TabsDestroyDemoModule {
}
