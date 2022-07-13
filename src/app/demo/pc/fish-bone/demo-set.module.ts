import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FishBoneFullModule} from "./full/demo.module";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {FishBoneFullComponent} from "./full/demo.component";
import {FishBoneAllComponent} from "./demo.component";

export const routerConfig =  [
    {
        path: 'all', component: FishBoneAllComponent
    },
    {
        path: 'full', component: FishBoneFullComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        FishBoneFullModule,
        JigsawMarkdownModule
    ],
    declarations: [FishBoneAllComponent]
})
export class FishBoneDemoModule {

}
