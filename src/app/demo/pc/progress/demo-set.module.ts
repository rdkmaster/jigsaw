import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProgressFullModule} from "./full/demo.module";
import {ProgressFullComponent} from "./full/demo.component";
import {ProgressAllComponent} from "./all/demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {ProgressBasicModule} from "./basic/demo.module";
import {ProgressStatusModule} from "./status/demo.module";
import {ProgressLargeSizeModule} from "./large-size/demo.module";
import {ProgressEstimationModule} from "./estimation/demo.module";
import {CircleProgressDemoModule} from "./circle-progress/demo.module";
import {TopProgressDemoModule} from "./top/demo.module";

export const routerConfig = [
    {
        path: 'all', component: ProgressAllComponent
    },
    {
        path: 'full', component: ProgressFullComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ProgressFullModule,
        CircleProgressDemoModule,
        JigsawMarkdownModule,
        ProgressBasicModule,
        ProgressStatusModule,
        ProgressLargeSizeModule,
        ProgressEstimationModule,
        TopProgressDemoModule
    ],
    declarations: [ProgressAllComponent]
})
export class ProgressDemoModule {}
