import {NgModule} from "@angular/core";
import {ServerSidePaginationDemoComponent} from "./app.component";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [ServerSidePaginationDemoComponent],
    imports: [JigsawButtonModule, CommonModule],
    exports: [ServerSidePaginationDemoComponent]
})
export class ServerSidePaginationDemoModule{

}
