import { NgModule } from "@angular/core";
import { TranslateDemoComponent } from "./demo.component";
import { CommonModule } from "@angular/common";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";

@NgModule({
    declarations: [TranslateDemoComponent],
    imports: [CommonModule, JigsawMarkdownModule]
})
export class TranslateDemoModule {
}
