import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { SelectCollapseInfiniteScrollDemoComponent } from "./infinite-scroll/demo.component";
import { SelectCollapseInfiniteScrollDemoModule } from "./infinite-scroll/demo.module";
import {SelectCollapseDemoComponent} from "./select-collapse/demo.component";
import {SelectCollapseDemoModule} from "./select-collapse/demo.module";
import { SelectCollapseShowBorderDemoComponent } from "./show-border/demo.component";
import { SelectCollapseShowBorderDemoModule } from "./show-border/demo.module";
import { SelectCollapseValidDemoComponent } from './valid/demo.component';
import { SelectCollapseValidDemoModule } from './valid/demo.module';

export const routerConfig = [
    {
        path: 'select-collapse', component: SelectCollapseDemoComponent
    },
    {
        path: 'valid', component: SelectCollapseValidDemoComponent
    },
    {
        path: 'show-border', component: SelectCollapseShowBorderDemoComponent
    },
    {
        path: 'infinite-scroll', component: SelectCollapseInfiniteScrollDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), SelectCollapseDemoModule, SelectCollapseValidDemoModule,
        SelectCollapseInfiniteScrollDemoModule, SelectCollapseShowBorderDemoModule
    ]
})
export class SelectCollapseDemoSetModule {
}
