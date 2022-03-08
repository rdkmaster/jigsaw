import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SelectCollapseDemoComponent} from "./select-collapse/demo.component";
import {SelectCollapseDemoModule} from "./select-collapse/demo.module";
import { SelectCollapseValidDemoComponent } from './valid/demo.component';
import { SelectCollapseValidDemoModule } from './valid/demo.module';

export const routerConfig = [
    {
        path: 'select-collapse', component: SelectCollapseDemoComponent
    },
    {
        path: 'valid', component: SelectCollapseValidDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), SelectCollapseDemoModule, SelectCollapseValidDemoModule
    ]
})
export class SelectCollapseDemoSetModule {
}
