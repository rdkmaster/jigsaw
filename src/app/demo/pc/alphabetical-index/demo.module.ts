import {NgModule} from "@angular/core";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {AlphabeticalIndexDemoComponent} from "./demo.component";
import {JigsawIndexBasicDemoComponent} from "./basic/demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {JigsawInputModule} from "../../../../jigsaw/pc-components/input/input";
import {JigsawHeaderModule} from "../../../../jigsaw/pc-components/header/header";
import {JigsawAlphabeticalIndexModule} from "../../../../jigsaw/pc-components/alphabetical-index";

@NgModule({
    declarations: [AlphabeticalIndexDemoComponent, JigsawIndexBasicDemoComponent],
    imports: [DemoTemplateModule, JigsawMarkdownModule, JigsawButtonModule, JigsawInputModule, JigsawHeaderModule,
        JigsawAlphabeticalIndexModule]
})
export class AlphabeticalIndexModule {
}
