import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TileSelectFullDemoModule} from "./full/app.module";
import {TileSelectLabelFieldDemoModule} from "./label-field/app.module";
import {TileSelectMultiSelectDemoModule} from "./multiple-select/app.module";
import {TileSelectSelectedItemsDemoModule} from "./selected-items/app.module";
import {TileSelectItemsChangeDemoModule} from "./selected-items-change/app.module";
import {TileSelectOptionWidthDemoModule} from "./tile-option-width/app.module";
import {TileSelectTrackItemByDemoModule} from "./track-item-by/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('tile');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        TileSelectFullDemoModule, TileSelectLabelFieldDemoModule, TileSelectMultiSelectDemoModule,
        TileSelectSelectedItemsDemoModule, TileSelectItemsChangeDemoModule,
        TileSelectOptionWidthDemoModule, TileSelectTrackItemByDemoModule
    ]
})
export class TileSelectDemoModule { }
