/**
 * Created by 10177553 on 2017/3/23.
 */
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { RdkGraph } from './graph';

@NgModule({
    imports: [CommonModule],
    exports: [RdkGraph],
    declarations: [RdkGraph],
    providers: [],
})
export class RdkGraphModule { }

export * from './graph';
