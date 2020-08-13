import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BadgeBasicDemoComponent} from "./basic/demo.component";
import {BadgeBasicDemoModule} from "./basic/demo.module";
import {BadgeMaskDemoComponent} from "./mask/demo.component";
import {BadgeMaxValueDemoComponent} from "./max-value/demo.component";
import {BadgePositionDemoComponent} from "./position/demo.component";
import {BadgeSizeDemoComponent} from "./size/demo.component";
import {BadgeStatusDemoComponent} from "./status/demo.component";
import {BadgeSizeDemoModule} from "./size/demo.module";
import {BadgeMaskDemoModule} from "./mask/demo.module";
import {BadgeMaxValueDemoModule} from "./max-value/demo.module";
import {BadgePositionDemoModule} from "./position/demo.module";
import {BadgeStatusDemoModule} from "./status/demo.module";
import {BadgeMoveDemoComponent} from "./move/demo.component";
import {BadgeMoveDemoModule} from "./move/demo.module";

export const routerConfig = [
    {path: 'basic', component: BadgeBasicDemoComponent},
    {path: 'mask', component: BadgeMaskDemoComponent},
    {path: 'max-value', component: BadgeMaxValueDemoComponent},
    {path: 'position', component: BadgePositionDemoComponent},
    {path: 'size', component: BadgeSizeDemoComponent},
    {path: 'status', component: BadgeStatusDemoComponent},
    {path: 'move', component: BadgeMoveDemoComponent},

];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), BadgeBasicDemoModule, BadgeSizeDemoModule, BadgeMaskDemoModule,
        BadgeMaxValueDemoModule, BadgePositionDemoModule, BadgeStatusDemoModule, BadgeMoveDemoModule
    ]
})
export class BadgeDemoModule {
}
