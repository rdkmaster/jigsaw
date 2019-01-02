import {NgModule} from '@angular/core';
import {JigsawSwitchModule} from "jigsaw/component/switch";
import {JigsawTabsModule} from "jigsaw/component/tabs/index";
import {JigsawButtonBarModule} from "jigsaw/component/list-and-tile/button-bar";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TabHeadlessDemoComponent} from './demo.component';

/* #for-live-demo-only#
const routes = [{
    path: 'tab-page', component: DynamicTabDemoComponent
}];
*/
@NgModule({
    imports: [
        JigsawTabsModule, JigsawSwitchModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, JigsawInputModule,
        JigsawTableModule,JigsawGraphModule
    ],
    declarations: [TabHeadlessDemoComponent],
    exports: [TabHeadlessDemoComponent]
})
export class TabHeadlessDemoModule {
}
