import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DatePickerBasicDemoComponent} from "./basic/demo.component";
import {DatePickerBasicDemoModule} from "./basic/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: DatePickerBasicDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        DatePickerBasicDemoModule
    ]
})
export class DatePickerDemoModule {
}
