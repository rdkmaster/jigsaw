import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {SearchInputHistoryStorageKeyDemoComponent} from "./demo.component";
import {JigsawSearchInputModule, JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [SearchInputHistoryStorageKeyDemoComponent],
    exports: [SearchInputHistoryStorageKeyDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawSearchInputModule, JigsawHeaderModule]
})
export class SearchInputHistoryStorageKeyDemoModule {
}
