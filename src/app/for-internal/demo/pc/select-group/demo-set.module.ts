import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { SelectGroupDemoComponent } from './select-group/demo.component';
import { SelectGroupDemoModule } from './select-group/demo.module';
import { SelectGroupEditResultDemoComponent } from './edit-selected-items/demo.component';
import { SelectGroupEditResultDemoModule } from './edit-selected-items/demo.module';
import {SelectGroupCustomizeGroupFieldDemoModule} from "./customize-group-field/demo.module";
import {SelectGroupCustomizeGroupFieldDemoComponent} from "./customize-group-field/demo.component";
import { SelectGroupValidDemoComponent } from './valid/demo.component';
import { SelectGroupValidDemoModule } from './valid/demo.module';
import { SelectGroupSearchableDemoComponent } from "./searchable/demo.component";
import { SelectGroupSearchableDemoModule } from "./searchable/demo.module";
import { SelectGroupInfiniteScrollDemoComponent } from "./infinite-scroll/demo.component";
import { SelectGroupInfiniteScrollDemoModule } from "./infinite-scroll/demo.module";

export const routerConfig = [
    {
        path: 'select-group', component: SelectGroupDemoComponent
    },
    {
        path: 'edit-selected-items', component: SelectGroupEditResultDemoComponent
    },
    {
        path: 'customize-group-field', component: SelectGroupCustomizeGroupFieldDemoComponent
    },
    {
        path: 'valid', component: SelectGroupValidDemoComponent
    },
    {
        path: 'searchable', component: SelectGroupSearchableDemoComponent
    },
    {
        path: 'infinite-scroll', component: SelectGroupInfiniteScrollDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        SelectGroupDemoModule,
        SelectGroupEditResultDemoModule,
        SelectGroupCustomizeGroupFieldDemoModule,
        SelectGroupValidDemoModule,
        SelectGroupSearchableDemoModule,
        SelectGroupInfiniteScrollDemoModule
    ]
})
export class SelectGroupDemoSetModule {
}
