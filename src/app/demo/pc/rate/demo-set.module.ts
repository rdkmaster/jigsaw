import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RateFullModule} from "./full/demo.module";
import {RateFullComponent} from "./full/demo.component";
import { RateDisabledModule } from './disabled/demo.module';
import { RateDisabledComponent } from './disabled/demo.component';

export const routerConfig = [
    {
        path: 'full', component: RateFullComponent
    },
    {
        path: 'disabled', component: RateDisabledComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        RateFullModule,
        RateDisabledModule
    ]
})
export class RateDemoModule {
}
