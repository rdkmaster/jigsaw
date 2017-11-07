import {NgModule} from "@angular/core";
import {JigsawFishBoneModule} from "jigsaw/component/fish-bone/fish-bone";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {FishBoneFullComponent} from "./app.component";

@NgModule({
    imports: [JigsawFishBoneModule, JigsawDemoDescriptionModule],
    declarations: [FishBoneFullComponent],
    bootstrap: [FishBoneFullComponent]
})
export class FishBoneFullModule {

}
