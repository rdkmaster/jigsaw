import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {JigsawTooltipModule} from "../tooltip/tooltip";
import {PopupService} from "../../common/service/popup.service";
import {JigsawTime} from "./time";

@NgModule({
    imports: [CommonModule, JigsawTooltipModule, TranslateModule.forRoot()],
    declarations: [JigsawTime],
    exports: [JigsawTime],
    providers: [PopupService, TranslateService],
})
export class JigsawTimeModule {
}

export * from './time';
