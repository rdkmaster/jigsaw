import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule, JigsawTileSelectModule, JigsawAlertModule, JigsawButtonModule} from "jigsaw/public_api";
import {SudokuGameComponent} from './demo.component';
import {NumberRenderer} from "./number-renderer";
import {NumberSelectPad} from "./number-select-pad";
import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [
        CommonModule, JigsawTableModule,
        JigsawAlertModule, JigsawTileSelectModule, JigsawButtonModule, DemoTemplateModule
    ],
    declarations: [SudokuGameComponent, NumberRenderer, NumberSelectPad],
    exports: [SudokuGameComponent]
})
export class SodokuGameModule {
}
