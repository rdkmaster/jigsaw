import {NgModule} from "@angular/core";
import {JigsawPaginationModule} from "jigsaw/pc-components/pagination/pagination";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PaginationBasicDemoComponent} from "./demo.component";
@NgModule({
    declarations: [PaginationBasicDemoComponent],
    exports: [PaginationBasicDemoComponent],
    imports: [JigsawPaginationModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class PaginationBasicDemoModule{

}
