import {NgModule} from '@angular/core';
import {JigsawTabModule} from "jigsaw/component/tabs/index";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawTabsDemoComponent} from './app.component';
import {JigsawGraphModule} from "../../../../jigsaw/component/graph/index";

@NgModule({
    imports: [
        JigsawTabModule, JigsawButtonModule, JigsawInputModule, JigsawTableModule, JigsawDemoDescriptionModule, JigsawGraphModule
    ],
    declarations: [JigsawTabsDemoComponent],
    exports: [JigsawTabsDemoComponent]
})
export class TabsBasicDemoModule {
}
