import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {ServerSidePaginationDemoComponent} from "./app.component";
@NgModule({
    declarations: [ServerSidePaginationDemoComponent],
    imports: [JigsawButtonModule, CommonModule]
})
export class ServerSidePaginationDemoModule{

}
