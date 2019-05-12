import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AutoCompleteInputBasicDemoComponent} from "./basic/demo.component";
import {AutoCompleteInputBasicDemoModule} from "./basic/demo.module";
import {AutoCompleteInputGroupDemoComponent} from "./with-group/demo.component";
import {AutoCompleteInputNonGroupDemoComponent} from "./non-group/demo.component";
import {AutoCompleteInputGroupDemoModule} from "./with-group/demo.module";
import {AutoCompleteInputNonGroupDemoModule} from "./non-group/demo.module";
import {AutoCompleteInputSelectEventDemoComponent} from "./select-event/demo.component";
import {AutoCompleteInputSelectEventDemoModule} from "./select-event/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: AutoCompleteInputBasicDemoComponent
    },
    {
        path: 'with-group', component: AutoCompleteInputGroupDemoComponent
    },
    {
        path: 'non-group', component: AutoCompleteInputNonGroupDemoComponent
    },
    {
        path: 'select-event', component: AutoCompleteInputSelectEventDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), AutoCompleteInputBasicDemoModule,
        AutoCompleteInputGroupDemoModule, AutoCompleteInputNonGroupDemoModule,
        AutoCompleteInputSelectEventDemoModule
    ]
})
export class AutoCompleteInputDemoModule {
}
