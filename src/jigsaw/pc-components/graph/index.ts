/**
 * Created by 10177553 on 2017/3/23.
 */
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { JigsawGraph } from './graph';
import {JigsawGraphDownloadDirective} from "./graph-download.directive";

@NgModule({
    imports: [CommonModule],
    exports: [JigsawGraph,JigsawGraphDownloadDirective],
    declarations: [JigsawGraph,JigsawGraphDownloadDirective],
})
export class JigsawGraphModule { }

export * from './graph';
export * from './graph-download.directive';
