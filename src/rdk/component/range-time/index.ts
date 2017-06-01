import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RdkRangeTime} from "./range-time";
import {RdkTimeModule} from "../time/index";
@NgModule({
    imports: [CommonModule,RdkTimeModule],
    declarations: [RdkRangeTime],
    exports: [RdkRangeTime],
})
export class RdkRangeTimeModule {

}
