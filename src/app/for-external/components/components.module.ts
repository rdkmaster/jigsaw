import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
/*路由&守卫*/
import {ComponentRoutingModule} from "./components-routing.module";

/*模块*/
import {UedCommonModule} from "../common/ued-common.module";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

/*组件*/
import {ComponentMenuNavComponent} from "./component-menu-nav/component-menu-nav.component";
import {ComponentDetailComponent} from "./component-detail/component-detail.component";
import {ComponentDetailNavComponent} from './component-detail/component-detail-nav/component-detail-nav.component';
import {ComponentDetailContentComponent} from './component-detail/component-detail-content/component-detail-content.component';
import {DemoComponent} from './component-detail/component-detail-content/demo/demo.component';
import {ApiComponent} from './component-detail/component-detail-content/api/api.component';
import {ApiListComponent} from './component-detail/component-detail-content/api-list/api-list.component';

/*服务*/
import {ComponentMenuService} from "./service/component.service";
import {SanitizeHtmlPipe} from "./component-detail/component-detail-content/component-detail-content.component";
import {SanitizeResourceUrLPipe} from "./component-detail/component-detail-content/component-detail-content.component";
import {ApiListService} from "./component-detail/component-detail-content/api-list/service/post-list.service";
import {JigsawButtonModule} from "@rdkmaster/jigsaw";
import {IntroduceComponent} from "app/components/introduce/introduce";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    UedCommonModule,
    PerfectScrollbarModule,
    ComponentRoutingModule,
    JigsawButtonModule
  ],
  providers: [ComponentMenuService, ApiListService],
  declarations: [
    ComponentMenuNavComponent,
    SanitizeHtmlPipe,
    SanitizeResourceUrLPipe,
    ComponentDetailComponent,
    ComponentDetailNavComponent,
    ComponentDetailContentComponent,
    DemoComponent,
    ApiComponent,
    ApiListComponent,
    IntroduceComponent
  ]
})
export class ComponentsModule {
}
