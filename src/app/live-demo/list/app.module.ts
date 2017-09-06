import {NgModule} from "@angular/core";
import {ListBasicDemoComponent} from "./app.component";
import {JigsawListModule} from "jigsaw/component/list-and-tile/list";
import {CommonModule} from "@angular/common";
import {JigsawCheckBoxModule} from "../../../jigsaw/component/checkbox/index";
import {JigsawComboSelectModule} from "../../../jigsaw/component/combo-select/index";

@NgModule({
    imports: [JigsawListModule, CommonModule, JigsawCheckBoxModule, JigsawComboSelectModule],
    declarations: [ListBasicDemoComponent]
})
export class ListBasicDemoModule{

}
