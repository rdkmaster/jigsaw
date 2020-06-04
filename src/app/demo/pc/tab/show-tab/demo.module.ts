import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawTabsModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawShowTabComponent} from './demo.component';

@NgModule({
    imports: [JigsawTabsModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [JigsawShowTabComponent],
    exports: [JigsawShowTabComponent]
})
export class TabsShowTabDemoModule {
}
