/**
 * Created by 10177553 on 2017/3/23.
 */
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { JigsawGraph } from './graph';
import {JigsawGraphDownloadButton, JigsawGraphDownloadDirective} from "./graph-download.directive";
import {PopupService} from "../../common/service/popup.service";
import {LoadingService} from "../../common/service/loading.service";

@NgModule({
    imports: [CommonModule],
    exports: [JigsawGraph,JigsawGraphDownloadDirective],
    declarations: [JigsawGraph,JigsawGraphDownloadButton,JigsawGraphDownloadDirective],
    providers: [PopupService,LoadingService],
    entryComponents:[JigsawGraphDownloadButton]
})
export class JigsawGraphModule { }

export * from './graph';
export * from './graph-download.directive';
