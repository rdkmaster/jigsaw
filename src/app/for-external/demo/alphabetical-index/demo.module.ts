import { NgModule } from "@angular/core";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { AlphabeticalIndexDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { JigsawButtonModule, JigsawInputModule, JigsawAlphabeticalIndexModule, JigsawAlphabeticalIndexSelectModule } from "jigsaw/public_api";
import { AlphabeticalIndexBasicDemoComponent } from "./basic/demo.component";
import { AlphabeticalIndexDictionaryDemoComponent } from "./dictionary/demo.component";
import { AlphabeticalIndexMultiToneDemoComponent } from "./multi-tone/demo.component";
import { AlphabeticalIndexPermanentDemoComponent } from "./permanent/demo.component";

@NgModule({
    declarations: [AlphabeticalIndexDemoComponent, AlphabeticalIndexBasicDemoComponent, AlphabeticalIndexDictionaryDemoComponent,
        AlphabeticalIndexMultiToneDemoComponent, AlphabeticalIndexPermanentDemoComponent],
    imports: [DemoTemplateModule, JigsawMarkdownModule, JigsawButtonModule, JigsawInputModule,
        JigsawAlphabeticalIndexModule, JigsawAlphabeticalIndexSelectModule]
})
export class AlphabeticalIndexDemoModule {
}
