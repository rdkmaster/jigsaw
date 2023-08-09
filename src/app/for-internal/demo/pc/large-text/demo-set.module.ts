import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LargeTextCommonDemoComponent} from "./common/demo.component";
import {LargeTextCommonDemoModule} from "./common/demo.module";
import {LargeTextTrendDemoComponent} from "./trend/demo.component";
import {LargeTextTrendDemoModule} from "./trend/demo.module";
import {LargeTextPictureDemoComponent} from "./picture/demo.component";
import {LargeTextPictureDemoModule} from "./picture/demo.module";

export const routerConfig = [
    {
        path: 'common', component: LargeTextCommonDemoComponent
    },
    {
        path: 'trend', component: LargeTextTrendDemoComponent
    },
    {
        path: 'picture', component: LargeTextPictureDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), LargeTextCommonDemoModule, LargeTextTrendDemoModule, LargeTextPictureDemoModule
    ]
})
export class LargeTextDemoModule {
}
