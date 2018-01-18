import {NgModule} from "@angular/core";
import {JigsawPaginationModule} from "jigsaw/component/pagination/pagination";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ServerSidePagingDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ServerSidePagingDemoComponent],
    exports: [ServerSidePagingDemoComponent],
    imports: [JigsawPaginationModule, JigsawDemoDescriptionModule]
})
export class ServerSidePagingDemoModule {

}
