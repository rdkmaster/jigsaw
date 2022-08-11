import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SearchInputBasicDemoComponent } from "./basic/demo.component";
import { SearchInputBasicDemoModule } from "./basic/demo.module";
import { SearchInputDisabledDemoComponent } from "./disabled/demo.component";
import { SearchInputDisabledDemoModule } from "./disabled/demo.module";
import { SearchInputDebounceDemoComponent } from "./debounce/demo.component";
import { SearchInputDebounceDemoModule } from "./debounce/demo.module";
import {SearchInputHistoryStorageKeyDemoComponent} from "./history-storage-key/demo.component";
import {SearchInputHistoryStorageKeyDemoModule} from "./history-storage-key/demo.module";

export const routerConfig = [
    {
        path: "basic", component: SearchInputBasicDemoComponent
    },
    {
        path: "disabled", component: SearchInputDisabledDemoComponent
    },
    {
        path: "debounce", component: SearchInputDebounceDemoComponent
    },
    {
        path: "history-storage-key", component: SearchInputHistoryStorageKeyDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        SearchInputBasicDemoModule,
        SearchInputDisabledDemoModule,
        SearchInputDebounceDemoModule,
        SearchInputHistoryStorageKeyDemoModule
    ]
})
export class SearchInputDemoModule {}
