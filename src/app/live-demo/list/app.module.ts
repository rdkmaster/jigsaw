import {NgModule} from "@angular/core";
import {ListBasicDemoComponent} from "./app.component";
import {JigsawListModule} from "jigsaw/component/list-and-tile/list";
import {CommonModule} from "@angular/common";
import {JigsawCheckBoxModule} from "../../../jigsaw/component/checkbox/index";

@NgModule({
    imports: [JigsawListModule, CommonModule, JigsawCheckBoxModule],
    declarations: [ListBasicDemoComponent]
})
export class ListBasicDemoModule{

}
