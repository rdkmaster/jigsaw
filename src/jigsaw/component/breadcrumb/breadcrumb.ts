import {Component, Input, NgModule, Optional} from "@angular/core";

@Component({
    selector: 'jigsaw-breadcrumb, j-breadcrumb',
    template: '<ng-content></ng-content>',
    host: {
        '[class.jigsaw-breadcrumb]': 'true'
    }
})
export class JigsawBreadcrumb {
    @Input()
    public separator: string = '/';

}

@Component({
    selector: 'jigsaw-breadcrumb-item, j-breadcrumb-item',
    template: `<ng-content></ng-content>{{_$breadcrumbHost.separator}}`,
    host: {
        '[class.jigsaw-breadcrumb-item]': 'true'
    }
})
export class JigsawBreadcrumbItem {
    constructor(@Optional() public _$breadcrumbHost: JigsawBreadcrumb) {

    }
}

@NgModule({
    declarations: [JigsawBreadcrumb, JigsawBreadcrumbItem],
    exports: [JigsawBreadcrumb, JigsawBreadcrumbItem]
})
export class JigsawBreadcrumbModule {

}
