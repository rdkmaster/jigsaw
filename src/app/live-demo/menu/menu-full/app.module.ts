import {NgModule} from "@angular/core";
import {MenuFullDemoComponent} from "./app.component";
import {JigsawListModule} from "jigsaw/component/list-and-tile/list";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {MenuHorizonModule} from "jigsaw/component/menu/menu-horizon/app.component";
import {MenuVerticalModule} from "jigsaw/component/menu/menu-vertical/app.component";
import {MenuContextModule} from "jigsaw/component/menu/menu-context/app.component";
import {CommonModule} from "@angular/common";
import {JigsawCheckBoxModule} from "../../../../jigsaw/component/checkbox/index";
import {JigsawComboSelectModule} from "../../../../jigsaw/component/combo-select/index";

@NgModule({
    imports: [JigsawListModule, CommonModule, JigsawCheckBoxModule, JigsawComboSelectModule, JigsawButtonModule, MenuHorizonModule, MenuVerticalModule, MenuContextModule],
    declarations: [MenuFullDemoComponent],
    bootstrap: [MenuFullDemoComponent]
})
export class MenuFullDemoModule {
}
