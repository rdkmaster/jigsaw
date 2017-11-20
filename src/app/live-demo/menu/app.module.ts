import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuFullComponent} from './app.component';

import {JigsawMenuModule} from "../../../jigsaw/component/menu/menu.module";
import {JigsawButtonModule} from "../../../jigsaw/component/button/button";

@NgModule({
    imports: [
        CommonModule,
        JigsawMenuModule,
        JigsawButtonModule
    ],
    declarations: [MenuFullComponent],
    bootstrap: [MenuFullComponent],
})
export class MenuFullModule {
}
