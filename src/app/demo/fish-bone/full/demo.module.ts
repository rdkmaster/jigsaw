import {NgModule} from "@angular/core";
import {JigsawFishBoneModule} from "jigsaw/pc-components/fish-bone/fish-bone";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {FishBoneFullComponent} from "./demo.component";
import {JigsawSelectModule} from "jigsaw/pc-components/select/select";

@NgModule({
    imports: [JigsawFishBoneModule, JigsawDemoDescriptionModule, JigsawSelectModule],
    declarations: [FishBoneFullComponent],
    exports: [FishBoneFullComponent]
})
export class FishBoneFullModule {

}
