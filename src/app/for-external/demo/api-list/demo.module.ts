import { NgModule } from "@angular/core";
import { ApiListComponent } from "./demo.component";
import { CommonModule } from "@angular/common";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { DocTemplateModule } from "../../template/doc-template/doc-template";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { JigsawAlphabeticalIndexModule, JigsawSearchInputModule } from 'jigsaw/public_api';

@NgModule({
    declarations: [ApiListComponent],
    imports: [
        CommonModule,
        JigsawMarkdownModule,
        DocTemplateModule,
        PerfectScrollbarModule,
        JigsawAlphabeticalIndexModule,
        JigsawSearchInputModule
    ],
})
export class ApiListDemoModule { }
