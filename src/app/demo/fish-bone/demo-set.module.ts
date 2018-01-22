import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FishBoneFullModule} from "./full/demo.module";

import {FishBoneFullComponent} from "./full/demo.component";

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
