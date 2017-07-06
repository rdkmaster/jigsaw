import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {JigsawTime} from "./time";
import {JigsawTooltipModule} from "../tooltip/tooltip";
import {PopupService} from "../../service/popup.service";
@NgModule({
    imports: [CommonModule, JigsawTooltipModule],
    declarations: [JigsawTime],
    exports: [JigsawTime],
    providers: [PopupService],
})
export class JigsawTimeModule {

}

export * from './time';
