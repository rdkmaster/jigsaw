import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawListModule} from "../list-and-tile/list";
import {JigsawMenuComponent} from "./menu";
import {JigsawFloatModule} from "../../common/directive/float";

@NgModule({
    declarations: [JigsawMenuComponent],
    exports: [JigsawMenuComponent],
    imports: [JigsawListModule, JigsawFloatModule, CommonModule, PerfectScrollbarModule],
})
export class JigsawMenuModule {
}
