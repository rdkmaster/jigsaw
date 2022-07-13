import {NgModule} from "@angular/core";
import {SearchInputHistoryStorageKeyDemoComponent} from "./demo.component";
import {JigsawSearchInputModule, JigsawHeaderModule} from "jigsaw/public_api";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [SearchInputHistoryStorageKeyDemoComponent],
    exports: [SearchInputHistoryStorageKeyDemoComponent],
    imports: [JigsawSearchInputModule, JigsawHeaderModule, DemoTemplateModule]
})
export class SearchInputHistoryStorageKeyDemoModule {
}
