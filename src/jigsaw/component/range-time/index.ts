import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {JigsawRangeTime} from "./range-time";
import {JigsawTimeModule} from "../time/index";
@NgModule({
    imports: [CommonModule, JigsawTimeModule],
    declarations: [JigsawRangeTime],
    exports: [JigsawRangeTime],
})
export class JigsawRangeTimeModule {

}

export * from './range-time';
export * from './shortcut-dateranges';
