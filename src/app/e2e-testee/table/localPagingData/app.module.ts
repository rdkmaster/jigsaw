import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawPaginationModule} from "jigsaw/component/pagination/pagination";
import {LocalPagingDataDemoComponent, NoopInterceptor} from './app.component';

@NgModule({
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: NoopInterceptor,
        multi: true,
    }],
    imports: [JigsawTableModule, JigsawPaginationModule],
    declarations: [LocalPagingDataDemoComponent],
    bootstrap: [LocalPagingDataDemoComponent]
})
export class LocalPagingDataDemoModule {
}
