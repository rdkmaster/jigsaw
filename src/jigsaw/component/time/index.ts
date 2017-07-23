import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {JigsawTime} from "./time";
import {JigsawTooltipModule} from "jigsaw/component/tooltip/tooltip";
import {PopupService} from "jigsaw/service/popup.service";
@NgModule({
    imports: [CommonModule, JigsawTooltipModule],
    declarations: [JigsawTime],
    exports: [JigsawTime],
    providers: [PopupService, TranslateService],
})
export class JigsawTimeModule {
}

export * from './time';
