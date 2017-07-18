import {NgModule} from "@angular/core";
import {ServerSidePagingDemoComponent} from "./app.component";
import {JigsawPaginationModule} from "../../../../jigsaw/component/pagination/pagination";
@NgModule({
    declarations: [ServerSidePagingDemoComponent],
    imports: [JigsawPaginationModule]
})
export class ServerSidePagingDemoModule{

}
