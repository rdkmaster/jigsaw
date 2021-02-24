import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProgressFullModule} from "./full/demo.module";
import {ProgressFullComponent} from "./full/demo.component";
import { JigsawCircleProgressDemoModule } from './circle-progress/demo.module';
import { JigsawCircleProgressDemoComponent } from './circle-progress/demo.component';

export const routerConfig = [
    {
        path: 'full', component: ProgressFullComponent
    },
    {
        path: 'circle-progress', component: JigsawCircleProgressDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ProgressFullModule,
        JigsawCircleProgressDemoModule
    ]
})
export class ProgressDemoModule {}
