import { NgModule } from "@angular/core";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { AlphabeticalIndexDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../markdown/markdown";
import { JigsawButtonModule, JigsawInputModule, JigsawHeaderModule, JigsawAlphabeticalIndexModule, JigsawAlphabeticalIndexSelectModule } from "jigsaw/public_api";
import { AlphabeticalIndexBasicDemoComponent } from "./basic/demo.component";
import { AlphabeticalIndexDictionaryDemoComponent } from "./dictionary/demo.component";
import { AlphabeticalIndexMultiToneDemoComponent } from "./multi-tone/demo.component";
import { AlphabeticalIndexInDomDemoComponent } from "./in-dom/demo.component";

@NgModule({
    declarations: [AlphabeticalIndexDemoComponent, AlphabeticalIndexBasicDemoComponent, AlphabeticalIndexDictionaryDemoComponent,
        AlphabeticalIndexMultiToneDemoComponent, AlphabeticalIndexInDomDemoComponent],
    imports: [DemoTemplateModule, JigsawMarkdownModule, JigsawButtonModule, JigsawInputModule, JigsawHeaderModule,
        JigsawAlphabeticalIndexModule, JigsawAlphabeticalIndexSelectModule]
})
export class AlphabeticalIndexDemoModule {
}
