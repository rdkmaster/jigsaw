import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styles: [`
               .fa-bars{
                     margin:160px
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
export class FloatPositionDemo {
    floatPosition = "bottomLeft";
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何改变弹出的位置，一共8个位置，其中第一个单词表示弹出视图在触发点的哪个位置，第二个单词控制弹出视图的哪个边缘与触发点对齐，比如\'bottomLeft\'表示在下面弹出来，并且视图左侧与触发点左侧对齐。注意，这个位置是应用给的理想位置，在弹出的时候会自动对理想位置坐修正，避免视图超时浏览器边界的情况';
    description: string = '';
    tags: string[] = [
        'JigsawFloat.jigsawFloatPosition'
    ];
}
