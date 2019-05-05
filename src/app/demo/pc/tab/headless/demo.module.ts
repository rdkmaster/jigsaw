import {NgModule} from '@angular/core';
import {JigsawSwitchModule} from "jigsaw/pc-components/switch";
import {JigsawTabsModule} from "jigsaw/pc-components/tabs/index";
import {JigsawButtonBarModule} from "jigsaw/pc-components/list-and-tile/button-bar";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawGraphModule} from "jigsaw/pc-components/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TabHeadlessDemoComponent} from './demo.component';

/* #for-live-demo-only#
const routes = [{
    path: 'tab-page', pc-components: DynamicTabDemoComponent
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
