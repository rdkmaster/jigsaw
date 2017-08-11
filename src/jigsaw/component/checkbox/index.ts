/**
 * Created by 10177553 on 2017/3/14.
 */
import {NgModule} from '@angular/core';

import {JigsawCheckBox} from './checkbox';
import {CommonModule} from "@angular/common";

export * from './checkbox';

@NgModule({
    imports: [CommonModule],
    exports: [JigsawCheckBox, CommonModule],
    declarations: [JigsawCheckBox],
    providers: [],
})
export class JigsawCheckBoxModule { }

