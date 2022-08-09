import { NgModule } from "@angular/core";
import { PopupDemoComponent } from "./demo.component";
import { CommonModule } from "@angular/common";
import { JigsawMarkdownModule } from "../../markdown/markdown";
import { PopupServiceIntroduceComponent } from "./introduce/demo.component";
import { DemoTemplateModule } from "../../demo-template/demo-template";

@NgModule({
    declarations: [PopupDemoComponent, PopupServiceIntroduceComponent],
    imports: [CommonModule, JigsawMarkdownModule, DemoTemplateModule]
})
export class PopupDemoModule {
}
