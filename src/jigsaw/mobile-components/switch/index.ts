/**
 * Created by 10177553 on 2017/3/16.
 */
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { JigsawMobileSwitch } from './switch';

@NgModule({
    imports: [CommonModule],
    exports: [JigsawMobileSwitch],
    declarations: [JigsawMobileSwitch],
    providers: [],
})
export class JigsawMobileSwitchModule { }

export * from './switch';
