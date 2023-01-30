import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {noviceGuide, NoviceGuideType, SteppedNoviceGuide} from 'jigsaw/public_api';

@Component({
    templateUrl: "./demo.component.html",
    encapsulation: ViewEncapsulation.None
})
export class JigsawNoviceGuideCustomizedStepIdDemoComponent implements OnInit {
    steppedGuideData: SteppedNoviceGuide = {
        type: NoviceGuideType.stepped,
        notices: [
            {
                title: '自定义标题', selector: 'div .stepped-novice-version', position: 'right',
                notice: '在指引内容比较多的时候，一个step拆开为多个step会比较友好。', version: 'v1'
            },
            {
                title: '自定义标题', selector: 'div .stepped-novice-version', position: 'right',
                notice: '但拆开后的指引往往有相同的selector，此时关掉一个step会导致判断出错。', version: 'v2'
            },
            {
                title: '自定义标题', selector: 'div .stepped-novice-version', position: 'right',
                notice: '解决的办法是给每个notice添加一个version属性，并设置不同的值。', version: 'v3'
            }
        ],
        version: 'v0.0.1'
    };

    reset() {
        noviceGuide.reset();
        location.reload();
    }

    ngOnInit() {
        noviceGuide.show(this.steppedGuideData);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "本demo演示了如何正确弹出一组具有相同selector的分步新手指引，给每个notice添加一个version属性，并设置不同的值";
    description: string = "";
}
