import {NgModule} from "@angular/core";
import {PaginationBasicDemoComponent} from "./app.component";
import {JigsawPaginationModule} from "jigsaw/component/pagination/pagination";
@NgModule({
    declarations: [PaginationBasicDemoComponent],
    imports: [JigsawPaginationModule]
})
export class PaginationBasicDemoModule{

}
