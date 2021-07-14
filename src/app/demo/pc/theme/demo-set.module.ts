import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { ThemeBuildInDemoComponent } from './build-in/demo.component';
import { ThemeBuildInDemoModule } from './build-in/demo.module';

export const routerConfig = [
    {
        path: 'build-in', component: ThemeBuildInDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), ThemeBuildInDemoModule
    ]
})
export class ThemeDemoModule {
}
