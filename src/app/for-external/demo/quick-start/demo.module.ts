import { NgModule } from "@angular/core";
import { QuickStartDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";

@NgModule({
    declarations: [QuickStartDemoComponent],
    imports: [JigsawMarkdownModule]
})
export class QuickStartDemoModule {
}
