import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TimePickerBasicDemoComponent} from "./basic/demo.component";
import {TimePickerBasicDemoModule} from "./basic/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: TimePickerBasicDemoComponent
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TimePickerBasicDemoModule
    ]
})
export class TimePickerDemoModule {
}
