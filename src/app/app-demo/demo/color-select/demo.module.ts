import {NgModule} from "@angular/core";
import {ColorSelectDemoComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../markdown/markdown";
import {ColorSelectBasicDemoComponent} from "./basic/demo.component";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {JigsawColorSelectModule} from "jigsaw/public_api";
import { ColorSelectConfirmDemoComponent} from "./confirm/demo.component";
import {ColorSelectLimitedDemoComponent} from "./limited/demo.component";
import {ColorSelectNoAlphaDemoComponent} from "./no-alpha/demo.component";

@NgModule({
    declarations: [ColorSelectDemoComponent, ColorSelectBasicDemoComponent, ColorSelectConfirmDemoComponent,
     ColorSelectLimitedDemoComponent, ColorSelectNoAlphaDemoComponent],
    imports: [ JigsawMarkdownModule, DemoTemplateModule, JigsawColorSelectModule]
})
export class ColorSelectDemoModule {
}
