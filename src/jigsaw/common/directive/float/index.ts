import {NgModule} from "@angular/core";
import {JigsawFloat} from "./float";
import {PopupService} from "../../service/popup.service";


@NgModule({
    declarations: [JigsawFloat],
    exports: [JigsawFloat],
    providers: [PopupService]
})
export class JigsawFloatModule {
}

export * from './float';

