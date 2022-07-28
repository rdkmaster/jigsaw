import {NgModule} from "@angular/core";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {AlphabeticalIndexDemoComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {JigsawInputModule} from "../../../../jigsaw/pc-components/input/input";
import {JigsawHeaderModule} from "../../../../jigsaw/pc-components/header/header";
import {JigsawAlphabeticalIndexModule, JigsawAlphabeticalIndexSelectModule} from "../../../../jigsaw/pc-components/alphabetical-index";
import {AlphabeticalIndexBasicDemoComponent} from "./basic/demo.component";
import {AlphabeticalIndexDictionaryDemoComponent} from "./dictionary/demo.component";
import {AlphabeticalIndexMultiToneDemoComponent} from "./multi-tone/demo.component";
import {AlphabeticalIndexInDomDemoComponent} from "./in-dom/demo.component";

@NgModule({
    declarations: [AlphabeticalIndexDemoComponent, AlphabeticalIndexBasicDemoComponent, AlphabeticalIndexDictionaryDemoComponent,
        AlphabeticalIndexMultiToneDemoComponent, AlphabeticalIndexInDomDemoComponent],
    imports: [DemoTemplateModule, JigsawMarkdownModule, JigsawButtonModule, JigsawInputModule, JigsawHeaderModule,
        JigsawAlphabeticalIndexModule, JigsawAlphabeticalIndexSelectModule]
})
export class AlphabeticalIndexModule {
}
