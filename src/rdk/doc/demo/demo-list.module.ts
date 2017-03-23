import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {demoListRoutes} from "./demo-list.routes";
import {DemoListComponent} from "./demo-list.component";


@NgModule({
    imports: [
        RouterModule.forChild(demoListRoutes)
    ],
    exports: [],
    declarations: [
        DemoListComponent
    ],
    providers: [],
})
export class DemoListModule { }
