import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {JigsawMenuComponent} from './menu.component';
import {JigsawListModule} from "../list-and-tile/list";
import {JigsawMenuSubComponent} from "./menu-sub.component";

@NgModule({
    imports: [
        CommonModule,
        JigsawListModule,
        RouterModule
    ],
    declarations: [JigsawMenuComponent, JigsawMenuSubComponent],
    exports: [JigsawMenuComponent, JigsawMenuSubComponent]
})
export class JigsawMenuModule {
}
