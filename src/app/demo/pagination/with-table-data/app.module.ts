import {NgModule} from "@angular/core";
import {JigsawPaginationModule} from "jigsaw/component/pagination/pagination";
import {ServerSidePagingDemoComponent} from "./app.component";
@NgModule({
    declarations: [ServerSidePagingDemoComponent],
    bootstrap: [ServerSidePagingDemoComponent],
    imports: [JigsawPaginationModule]
})
export class ServerSidePagingDemoModule{

}
