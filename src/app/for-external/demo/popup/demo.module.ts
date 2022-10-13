import { NgModule } from "@angular/core";
import { PopupDemoComponent } from "./demo.component";
import { CommonModule } from "@angular/common";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";

@NgModule({
    declarations: [PopupDemoComponent],
    imports: [CommonModule, JigsawMarkdownModule]
})
export class PopupDemoModule {
}
