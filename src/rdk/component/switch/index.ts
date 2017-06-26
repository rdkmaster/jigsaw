/**
 * Created by 10177553 on 2017/3/16.
 */
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { RdkSwitch } from './switch';

@NgModule({
    imports: [CommonModule],
    exports: [RdkSwitch],
    declarations: [RdkSwitch],
    providers: [],
})
export class RdkSwitchModule { }

export * from './switch';
