import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonBarModule, JigsawButtonModule, JigsawHeaderModule, JigsawPaginationModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {PaginationBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [PaginationBasicDemoComponent],
    exports: [PaginationBasicDemoComponent],
    imports: [
        CommonModule, JigsawPaginationModule, JigsawSwitchModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawButtonModule,
        JigsawButtonBarModule
    ]
})
export class PaginationBasicDemoModule{

}
