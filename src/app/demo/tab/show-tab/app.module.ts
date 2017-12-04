import {NgModule} from '@angular/core';
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawTabsModule} from "jigsaw/component/tabs/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawShowTabComponent} from './app.component';

@NgModule({
    imports: [JigsawTabsModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [JigsawShowTabComponent],
    exports: [JigsawShowTabComponent]
})
export class TabsShowTabDemoModule {
}
