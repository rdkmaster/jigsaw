/**
 * Created by 10177553 on 2017/4/26.
 */
import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html'
})
export class CollapseBasicDemoComponent {

    public _$isActiveChange(isActive:boolean){
        console.log(isActive);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了`JigsawCollapse`多个属性的基本用法';
    description: string = '';
    tags: string[] = [
        'JigsawCollapse.width', 'JigsawCollapse.mode',
        'JigsawCollapsePane.header', 'JigsawCollapsePane.isActive',
    ];
}
