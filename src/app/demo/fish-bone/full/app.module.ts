import {NgModule} from "@angular/core";
import {JigsawFishBoneModule} from "../../../../jigsaw/component/fish-bone/fish-bone";
import {FishBoneFullComponent} from "./app.component";

@NgModule({
    imports: [JigsawFishBoneModule],
    declarations: [FishBoneFullComponent],
    bootstrap: [FishBoneFullComponent]
})
export class FishBoneFullModule {

}
