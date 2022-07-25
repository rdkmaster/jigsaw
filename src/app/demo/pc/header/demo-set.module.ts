import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawHeaderBasicDemoModule } from "./basic/demo.module";
import { JigsawHeaderBasicDemoComponent } from "./basic/demo.component";
import {HeaderAllComponent} from "./all/demo.component";
import {HeaderFirstLevelDemoModule} from "./first-level/demo.module";
import {HeaderSecondLevelDemoModule} from "./second-level/demo.module";
import {HeaderThirdLevelDemoModule} from "./third-level/demo.module";
import {JigsawMarkdownModule} from "../../../markdown/markdown";

export const routerConfig = [
    {path: "all", component: HeaderAllComponent},
    { path: "basic", component: JigsawHeaderBasicDemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig),
        JigsawHeaderBasicDemoModule,
        HeaderFirstLevelDemoModule,
        HeaderSecondLevelDemoModule,
        HeaderThirdLevelDemoModule,
        JigsawMarkdownModule
    ],
    declarations: [HeaderAllComponent]
})
export class HeaderDemoModule {}
