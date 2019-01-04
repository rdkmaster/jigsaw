import {Component} from "@angular/core";
import {FloatTargetDemo} from "../target/demo.component";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
               .fa-bars{
                     margin:100px
               }
               .jigsawFloatArea{
                   width:150px;
                   height:60px;
                   background:orange;
                   color:#fff;
                   text-align:center;
                   line-height:60px;
               }
    `]
})
export class FloatBasicDemo {
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-float指令最简单的用法，所有配置项都用默认';
    description: string = '';
}
