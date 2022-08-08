import {NgModule} from "@angular/core";
import {DemoTemplateModule} from '../../../demo/demo-template/demo-template';
import {JigsawMarkdownModule} from '../../../markdown/markdown';
import {TileAllComponent} from "./demo.component";
import {JigsawSwitchModule, JigsawTileSelectModule, JigsawTileLiteModule} from "jigsaw/public_api";
import {CommonModule} from "@angular/common";
import {TileSelectBasicDemoComponent} from "./basic/demo.component";
import {TileSelectNoBorderDemoComponent} from "./no-border/demo.component";
import {TileSelectLabelFieldComponent} from "./label-field/demo.component";
import {TileSelectMultipleSelectDemoComponent} from "./multiple-select/demo.component";
import {TileSelectSelectedItemsComponent} from "./selected-items/demo.component";
import {TileSelectOptionWidthComponent} from "./tile-option-width/demo.component";
import {TileLiteBasicDemoComponent} from "./tile-lite/demo.component";



@NgModule({
    declarations: [
        TileAllComponent,
        TileSelectBasicDemoComponent,
        TileSelectNoBorderDemoComponent,
        TileSelectLabelFieldComponent,
        TileSelectMultipleSelectDemoComponent,
        TileSelectSelectedItemsComponent,
        TileSelectOptionWidthComponent,
        TileLiteBasicDemoComponent

    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawSwitchModule,
        JigsawTileSelectModule,
        CommonModule,
        JigsawTileLiteModule


    ]
})
export class TileSelectDemoModule {
}
