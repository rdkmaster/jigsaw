/**
 * Created by 10177553 on 2017/3/14.
 */
import {NgModule} from '@angular/core';

import {JigsawMobileCheckBox} from './checkbox';
import {CommonModule} from "@angular/common";

export * from './checkbox';

@NgModule({
    imports: [CommonModule],
    exports: [JigsawMobileCheckBox, CommonModule],
    declarations: [JigsawMobileCheckBox],
    providers: [],
})
export class JigsawMobileCheckBoxModule { }

