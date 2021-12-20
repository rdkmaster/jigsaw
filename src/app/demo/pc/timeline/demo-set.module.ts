import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawTiemlineBasicDemoModule } from './basic/demo.module';
import { JigsawTimelineBasicDemoComponent } from './basic/demo.component';

export const routerConfig = [
    {
        path: 'basic', component: JigsawTimelineBasicDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), JigsawTiemlineBasicDemoModule
    ]
})
export class TimelineDemoModule {
}
