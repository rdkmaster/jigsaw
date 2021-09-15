import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { SelectGroupDemoComponent } from './select-group/demo.component';
import { SelectGroupDemoModule } from './select-group/demo.module';
import { SelectGroupEditResultDemoComponent } from './edit-result/demo.component';
import { SelectGroupEditResultDemoModule } from './edit-result/demo.module';

export const routerConfig = [
    {
        path: 'select-group', component: SelectGroupDemoComponent
    },
    {
        path: 'edit-result', component: SelectGroupEditResultDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        SelectGroupDemoModule,
        SelectGroupEditResultDemoModule
    ]
})
export class SelectGroupDemoSetModule {
}
