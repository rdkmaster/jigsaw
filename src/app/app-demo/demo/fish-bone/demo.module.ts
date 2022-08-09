import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../../demo-template/demo-template';
import { JigsawMarkdownModule } from '../../../markdown/markdown';
import {JigsawFishBoneModule, JigsawSelectModule} from "jigsaw/public_api";
import {FishBoneAllComponent} from "./demo.component";
import {FishBoneBasicComponent} from "./basic/demo.component";
import {FishBoneSceneComponent} from "./scene/demo.component";

@NgModule({
    declarations: [
        FishBoneAllComponent,
        FishBoneBasicComponent,
        FishBoneSceneComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawFishBoneModule,
        JigsawSelectModule
    ]
})
export class FishBoneDemoModule {
}
