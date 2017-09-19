import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FishBoneFullComponent} from "../../live-demo/fish-bone/fish-bone-full/app.component";
import {FishBoneFullModule} from "../../live-demo/fish-bone/fish-bone-full/app.module";

const fishBoneDemoRoutes = [
    {path: 'fish-bone-full', component: FishBoneFullComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(fishBoneDemoRoutes),
        FishBoneFullModule
    ],
})
export class FishBoneDemoModule{

}
