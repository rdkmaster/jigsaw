import {NgModule} from "@angular/core";
import {JigsawPaginationModule} from "jigsaw/component/pagination/pagination";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ServerSidePagingDemoComponent} from "./app.component";

@NgModule({
    declarations: [ServerSidePagingDemoComponent],
    bootstrap: [ServerSidePagingDemoComponent],
    imports: [JigsawPaginationModule, JigsawDemoDescriptionModule]
})
export class ServerSidePagingDemoModule {

}
