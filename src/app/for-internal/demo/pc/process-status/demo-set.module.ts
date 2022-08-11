import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProcessStatusHorizontalBasicModule} from "./basic/demo.module";
import {ProcessStatusVerticalModule} from "./vertical/demo.module";
import {ProcessStatusHorizontalBasicComponent} from "./basic/demo.component";
import {ProcessStatusVerticalFullComponent} from "./vertical/demo.component";
import {ProcessStatusCustomIconsModule} from "./custom-icons/demo.module";
import {ProcessStatusCustomIconsComponent} from "./custom-icons/demo.component";
import {ProcessStatusMultilineComponent} from "./status-multiline/demo.component";
import {ProcessStatusMultilineModule} from "./status-multiline/demo.module";
import {ProcessStatusClickChangeStatusModule} from "./status-interactive/demo.module";
import {ProcessStatusClickChangeStatusComponent} from "./status-interactive/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: ProcessStatusHorizontalBasicComponent,
    },
    {
        path: 'vertical', component: ProcessStatusVerticalFullComponent,
    },
    {
        path: 'status-interactive', component: ProcessStatusClickChangeStatusComponent
    },
    {
        path: 'custom-icons', component: ProcessStatusCustomIconsComponent
    },
    {
        path: 'status-multiline', component: ProcessStatusMultilineComponent
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ProcessStatusHorizontalBasicModule,
        ProcessStatusClickChangeStatusModule,
        ProcessStatusCustomIconsModule,
        ProcessStatusVerticalModule,
        ProcessStatusMultilineModule
    ]
})
export class ProcessStatusDemoModule {

}
