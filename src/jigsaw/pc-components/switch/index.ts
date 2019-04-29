/**
 * Created by 10177553 on 2017/3/16.
 */
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { JigsawSwitch } from './switch';

@NgModule({
    imports: [CommonModule],
    exports: [JigsawSwitch],
    declarations: [JigsawSwitch],
    providers: [],
})
export class JigsawSwitchModule { }

export * from './switch';
