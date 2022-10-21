import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { JigsawFishBoneModule, JigsawSelectModule } from "jigsaw/public_api";
import { FishBoneAllComponent } from "./demo.component";
import { FishBoneBasicComponent } from "./basic/demo.component";
import { FishBoneSceneComponent } from "./scene/demo.component";

@NgModule({
    declarations: [
        FishBoneAllComponent,
        FishBoneBasicComponent,
        FishBoneSceneComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        JigsawMarkdownModule,
        JigsawFishBoneModule,
        JigsawSelectModule
    ]
})
export class FishBoneDemoModule {
}
