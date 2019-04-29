import {NgModule} from '@angular/core';
import {JigsawTabsModule} from "jigsaw/pc-components/tabs/index";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawGraphModule} from "jigsaw/pc-components/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawTabsDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTabsModule, JigsawButtonModule, JigsawInputModule, JigsawTableModule, JigsawDemoDescriptionModule, JigsawGraphModule
    ],
    declarations: [JigsawTabsDemoComponent],
    exports: [JigsawTabsDemoComponent]
})
export class TabsBasicDemoModule {
}
