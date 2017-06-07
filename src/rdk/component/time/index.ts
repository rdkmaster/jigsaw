import {CommonModule} from "@angular/common";
import {RdkTime} from "./time";
import {NgModule} from "@angular/core";
import {RdkTooltipModule} from "../tooltip/tooltip";
import {PopupService} from "../../service/popup.service";
@NgModule({
    imports: [CommonModule, RdkTooltipModule],
    declarations: [RdkTime],
    exports: [RdkTime],
    providers: [PopupService],
})
export class RdkTimeModule {

}
