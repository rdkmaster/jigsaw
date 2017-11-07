import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ServerSidePaginationDemoComponent} from "./app.component";
@NgModule({
    declarations: [ServerSidePaginationDemoComponent],
    bootstrap: [ ServerSidePaginationDemoComponent ],
    imports: [JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule]
})
export class ServerSidePaginationDemoModule{

}
