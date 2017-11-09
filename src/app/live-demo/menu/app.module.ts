import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuFullComponent} from './app.component';

import {JigsawMenuModule} from "../../../jigsaw/component/menu/menu.module";

@NgModule({
    imports: [
        CommonModule,
        JigsawMenuModule
    ],
    declarations: [MenuFullComponent],
    bootstrap: [MenuFullComponent],
})
export class MenuFullModule {
}
