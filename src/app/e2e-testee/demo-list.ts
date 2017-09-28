import {Component, ElementRef, NgModule, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from "@angular/common";
import {JigsawCollapseModule} from "jigsaw/component/collapse/collapse";
import {JigsawScrollBarModule} from "jigsaw/directive/scrollbar/scrollbar";
import {AffixUtils} from "jigsaw/core/utils/internal-utils";
import {liveDemoNavInfo, navInfo} from './nav-info'

@Component({
    selector: 'jigsaw-demo-list',
    templateUrl: 'demo-list.html',
    styleUrls: ['demo-list.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoListComponent implements OnInit {
    navHeight: number;
    navData: any[];
    liveDemoNavData: any;

    constructor(private _elementRef: ElementRef, private _router: Router) {
        this.navData = navInfo.sort((a, b) => a.title.localeCompare(b.title));
        this.liveDemoNavData = liveDemoNavInfo;
        this.liveDemoNavData.navList = liveDemoNavInfo.navList.sort((a, b) => a.group.localeCompare(b.group));
    }

    ngOnInit() {
        this.navHeight = (document.body.clientHeight -
            AffixUtils.offset(this._elementRef.nativeElement.querySelector('.left-box')).top) - 10;
        if (location.hash == '#/') {
            this._router.navigateByUrl('/button/button-full');
        }
    }
}

// 请按照组件的字符序排列
const demoListRoutes = [
    {
        path: '', component: DemoListComponent,
        children: navInfo
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(demoListRoutes),
        CommonModule,
        JigsawCollapseModule,
        JigsawScrollBarModule
    ],
    exports: [],
    declarations: [
        DemoListComponent
    ],
    providers: [],
})
export class DemoListModule {
}
