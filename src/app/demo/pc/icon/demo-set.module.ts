import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {IconBasicDemoComponent} from "./basic/demo.component";
import {IconIconsDemoComponent} from "./icons/demo.component";
import {IconBasicDemoModule} from "./basic/demo.module";
import {IconIconsDemoModule} from "./icons/demo.module";
import { IconStatusDemoComponent } from './status/demo.component';
import { IconStatusDemoModule } from './status/demo.module';

export const routerConfig = [
    {
        path: 'basic', component: IconBasicDemoComponent
    },
    {
        path: 'icons', component: IconIconsDemoComponent
    },
    {
        path: 'status', component: IconStatusDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        IconBasicDemoModule, IconIconsDemoModule, IconStatusDemoModule
    ]
})
export class IconDemoModule {

}
