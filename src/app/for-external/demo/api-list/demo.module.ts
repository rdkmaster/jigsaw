import { NgModule } from "@angular/core";
import { ApiListComponent } from "./demo.component";
import { CommonModule } from "@angular/common";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { DocTemplateModule } from "../../template/doc-template/doc-template";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

@NgModule({
    declarations: [ApiListComponent],
    imports: [
        CommonModule,
        JigsawMarkdownModule,
        DocTemplateModule,
        PerfectScrollbarModule,
    ],
})
export class ApiListDemoModule {}
