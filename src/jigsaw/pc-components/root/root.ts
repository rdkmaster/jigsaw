import {
    ChangeDetectionStrategy,
    Injector,
    Component,
    NgModule,
    NgZone,
    Renderer2,
    ViewContainerRef
} from "@angular/core";
import {PopupService} from "../../common/service/popup.service";
import {InternalUtils} from "../../common/core/utils/internal-utils";
import {TranslateService} from "@ngx-translate/core";
import {TranslateHelper} from "../../common/core/utils/translate-helper";

@Component({
    selector: 'jigsaw-root, j-root',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawRoot {
    constructor(viewContainerRef: ViewContainerRef, renderer: Renderer2, zone: NgZone, injector: Injector,
                ps: PopupService /* do not remove this line, need for global PopupService instantiate! */,
                translateService: TranslateService) {
        InternalUtils.viewContainerRef = viewContainerRef;
        InternalUtils.renderer = renderer;
        InternalUtils.zone = zone;
        TranslateHelper.translateService = translateService;
    }
}

@NgModule({
    declarations: [JigsawRoot],
    exports: [JigsawRoot],
    imports: [],
    providers: [PopupService]
})
export class JigsawRootModule {
}
