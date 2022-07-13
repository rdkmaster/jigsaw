import {NgModule} from "@angular/core";
import {JigsawFishBoneModule, JigsawSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {FishBoneFullComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawFishBoneModule, JigsawDemoDescriptionModule, JigsawSelectModule, JigsawHeaderModule, DemoTemplateModule],
    declarations: [FishBoneFullComponent],
    exports: [FishBoneFullComponent]
})
export class FishBoneFullModule {

}
