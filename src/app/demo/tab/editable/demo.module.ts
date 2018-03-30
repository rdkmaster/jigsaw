import {NgModule} from '@angular/core';
import {JigsawTabsModule} from "jigsaw/component/tabs/index";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {OneDemoComponent, TabsEditableDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTabsModule, JigsawButtonModule, JigsawInputModule, JigsawTableModule,
        JigsawDemoDescriptionModule, JigsawGraphModule, JigsawButtonModule
    ],
    declarations: [TabsEditableDemoComponent, OneDemoComponent],
    exports: [TabsEditableDemoComponent],
    entryComponents: [OneDemoComponent]
})
export class TabsEditableDemoModule {
}
