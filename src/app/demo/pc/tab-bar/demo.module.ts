import { NgModule } from "@angular/core";
import {TabBarAllComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {CommonModule} from "@angular/common";
import {JigsawTabsModule} from "../../../../jigsaw/pc-components/tabs";
import {TabBarTypeComponent} from "./type/demo.component";
import {TabBarBasicComponent} from "./basic/demo.component";
import {JigsawSwitchModule} from "../../../../jigsaw/pc-components/switch/switch";
import {JigsawTableModule} from "../../../../jigsaw/pc-components/table/table";
import {JigsawGraphModule} from "../../../../jigsaw/pc-components/graph";
import {TabBarBackgroundComponent} from "./background/demo.component";
import {TabBarEditableComponent} from "./editable/demo.component";

@NgModule({
    imports: [
        JigsawMarkdownModule,
        DemoTemplateModule,
        CommonModule,
        JigsawTabsModule,
        JigsawSwitchModule,
        JigsawTableModule,
        JigsawGraphModule
    ],
    declarations: [
        TabBarAllComponent,
        TabBarTypeComponent,
        TabBarBasicComponent,
        TabBarBackgroundComponent,
        TabBarEditableComponent
    ],
    exports: [TabBarAllComponent]
})
export class TabBarAllModule {}
