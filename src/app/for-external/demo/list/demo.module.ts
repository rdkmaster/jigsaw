import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { ListAllComponent } from "./demo.component";
import { JigsawListModule, JigsawCheckBoxModule, JigsawComboSelectModule } from "jigsaw/public_api";
import { CommonModule } from "@angular/common";
import { ListBasicDemoComponent } from "./basic/demo.component";
import { ListWithComponentDemoComponent } from "./with-component/demo.component";
import { ListWithComboSelectDemoComponent } from "./with-combo-select/demo.component";
import { ListMenuDemoComponent } from "./menu/demo.component";

@NgModule({
    declarations: [
        ListAllComponent,
        ListBasicDemoComponent,
        ListWithComponentDemoComponent,
        ListWithComboSelectDemoComponent,
        ListMenuDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        JigsawMarkdownModule,
        JigsawListModule,
        JigsawCheckBoxModule,
        JigsawComboSelectModule,
        CommonModule
    ]
})
export class ListDemoModule {
}
