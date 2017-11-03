import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FishBoneFullModule} from "./full/app.module";

import {FishBoneFullComponent} from "./full/app.component";

export const routerConfig =  [
    {
        path: 'full', component: FishBoneFullComponent, recommended: true
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        FishBoneFullModule
    ],
})
export class FishBoneDemoModule{

}
