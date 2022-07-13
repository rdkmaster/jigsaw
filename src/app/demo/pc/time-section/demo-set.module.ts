import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TimeSectionBasicDemoComponent} from "./basic/demo.component";
import {TimeSectionBasicDemoModule} from "./basic/demo.module";
import {TimeSectionOptionsDemoComponent} from "./time-section-options/demo.component";
import {TimeSectionOptionsDemoModule} from "./time-section-options/demo.module";
import {TimeSectionFillBackDemoComponent} from "./fill-back/demo.component";
import {TimeSectionFillBackDemoModule} from "./fill-back/demo.module";
import {TimeSectionAllComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";

export const routerConfig = [
    {
        path: 'all', component: TimeSectionAllComponent
    },
    {
        path: 'basic', component: TimeSectionBasicDemoComponent
    },
    {
        path: 'time-section-options', component: TimeSectionOptionsDemoComponent
    },
    {
        path: 'fill-back', component: TimeSectionFillBackDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TimeSectionBasicDemoModule,
        TimeSectionOptionsDemoModule,
        TimeSectionFillBackDemoModule,
        JigsawMarkdownModule
    ],
    declarations: [TimeSectionAllComponent]
})
export class TimeSectionDemoModule {
}
