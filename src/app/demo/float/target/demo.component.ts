import {AfterViewInit, Component, TemplateRef, ViewChild} from '@angular/core';
import {ArrayCollection} from "../../../../jigsaw/core/data/array-collection";
import {UserComponent} from "./user-component/user-component";

@Component({
    templateUrl: './demo.component.html',
    styles: [`.fa-bars{
                     margin:100px
               }
               .jigsawFloatArea1{
                   width:150px;
                   height:60px;
                   background:orange;
                   color:#fff;
                   text-align:center;
                   line-height:60px;
               }
                .jigsawFloatArea2{
                   width:150px;
                   height:60px;
                   background:green;
                   color:#fff;
                   text-align:center;
                   line-height:60px;
               }
    `]
})
export class FloatTargetDemo implements AfterViewInit {
    @ViewChild('jigsawFloatArea1')
    jigsawFloatArea1: TemplateRef<any>;
    @ViewChild('jigsawFloatArea2')
    jigsawFloatArea2: TemplateRef<any>;
    target;
    targets = new ArrayCollection(["template1", "template2", "component"]);


    public change(e) {
        switch (e[0]) {
            case 'template1':
                this.target = this.jigsawFloatArea1;
                break;
            case 'template2':
                this.target = this.jigsawFloatArea2;
                break;
            case 'component':
                this.target = UserComponent;
                break;
        }
    }


    ngAfterViewInit() {
        setTimeout(() => {
            this.target = this.jigsawFloatArea1;
        })
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何改变jigsawFloat指令的弹出目标';
    description: string = '';
    tags: string[] = [
        'JigsawFloat.jigsawFloatTarget'
    ];
}
