import {NgModule} from "@angular/core";
import {JigsawTableModule} from "../../../../jigsaw/component/table/table";
import {TableRendererLiveDemo} from "./app.component";
import {JigsawPaginationModule} from "../../../../jigsaw/component/pagination/pagination";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule],
    declarations: [TableRendererLiveDemo],
    bootstrap: [TableRendererLiveDemo]
})
export class TableRendererLiveDemoModule{

}
