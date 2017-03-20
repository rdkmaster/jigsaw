/**
 * Created by 10177553 on 2017/3/14.
 */
import { NgModule } from '@angular/core';

import { RdkCheckBox } from './checkbox';
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule],
    exports: [RdkCheckBox],
    declarations: [RdkCheckBox],
    providers: [],
})
export class RdkCheckBoxModule { }

export * from './checkbox';
