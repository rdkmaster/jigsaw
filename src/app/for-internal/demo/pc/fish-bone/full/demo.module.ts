import {NgModule} from "@angular/core";
import {JigsawFishBoneModule, JigsawSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {FishBoneFullComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawFishBoneModule, JigsawDemoDescriptionModule, JigsawSelectModule, JigsawHeaderModule],
    declarations: [FishBoneFullComponent],
    exports: [FishBoneFullComponent]
})
export class FishBoneFullModule {

}
