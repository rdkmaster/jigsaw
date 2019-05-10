/**
 * Created by 10177553 on 2017/3/23.
 */
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { JigsawMobileGraph } from './graph';

@NgModule({
    imports: [CommonModule],
    exports: [JigsawMobileGraph],
    declarations: [JigsawMobileGraph],
    providers: [],
})
export class JigsawMobileGraphModule { }

export * from './graph';
