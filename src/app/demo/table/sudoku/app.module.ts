import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {JigsawAlertModule} from "jigsaw/component/alert/alert";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SudokuGameComponent} from './app.component';
import {NumberRenderer} from "./number-renderer";
import {NumberSelectPad} from "./number-select-pad";

@NgModule({
    imports: [
        CommonModule, JigsawTableModule, JigsawDemoDescriptionModule,
        JigsawAlertModule, JigsawTileSelectModule, JigsawButtonModule
    ],
    declarations: [SudokuGameComponent, NumberRenderer, NumberSelectPad],
    exports: [SudokuGameComponent],
    entryComponents: [NumberRenderer, NumberSelectPad]
})
export class SodokuGameModule {
}
