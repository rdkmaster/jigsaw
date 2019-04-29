/**
 * Created by 10177553 on 2017/3/23.
 */
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { JigsawGraph } from './graph';

@NgModule({
    imports: [CommonModule],
    exports: [JigsawGraph],
    declarations: [JigsawGraph],
    providers: [],
})
export class JigsawGraphModule { }

export * from './graph';
