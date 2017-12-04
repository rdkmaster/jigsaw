import {NgModule} from "@angular/core";
import {JigsawPaginationModule} from "jigsaw/component/pagination/pagination";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PaginationBasicDemoComponent} from "./app.component";
@NgModule({
    declarations: [PaginationBasicDemoComponent],
    exports: [PaginationBasicDemoComponent],
    imports: [JigsawPaginationModule, JigsawDemoDescriptionModule]
})
export class PaginationBasicDemoModule{

}
