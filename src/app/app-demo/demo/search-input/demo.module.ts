import {NgModule} from "@angular/core";
import {DemoTemplateModule} from '../../demo-template/demo-template';
import {JigsawMarkdownModule} from '../../markdown/markdown';
import {SearchInputAllComponent} from "./demo.component";
import {SearchInputAutoSearchDemoComponent} from "./auto-search/demo.component";
import {JigsawSearchInputModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {SearchInputManualSearchDemoComponent} from "./manual-search/demo.component";
import {SearchInputDebounceDemoComponent} from "./debounce/demo.component";
import {SearchInputHistoryStorageKeyDemoComponent} from "./history-storage-key/demo.component";

@NgModule({
    declarations: [
        SearchInputAllComponent,
        SearchInputAutoSearchDemoComponent,
        SearchInputManualSearchDemoComponent,
        SearchInputDebounceDemoComponent,
        SearchInputHistoryStorageKeyDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawSearchInputModule,
        JigsawNumericInputModule
    ]
})
export class SearchInputDemoModule {
}
