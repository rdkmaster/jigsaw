import { Component, OnInit, AfterViewInit, ViewEncapsulation } from "@angular/core";
import { SimpleTreeData } from 'jigsaw/public_api';
import { SingularNoviceGuide, jigsawGuide, NoviceGuideConfig, MultipleNoviceGuide, NoviceGuide, NoviceGuideNoticeType, BubbleNoviceGuideNotice } from 'novice-guide/src/novice-guide';

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css", "../../../../../novice-guide/src/novice-guide.css"],
    encapsulation: ViewEncapsulation.None
})
export class JigsawNoviceGuideBasicDemoComponent implements OnInit {
    public navData: SimpleTreeData = new SimpleTreeData();

    getPos() {
        const ele = document.querySelector("li#guide1");
        console.log(ele.getBoundingClientRect());
    }

    changeSize() {
        const ele = document.querySelector("li#guide1");
        (ele as HTMLElement).style.width = '80px';
    }

    deleteEle() {
        const ele = document.querySelector("li#guide1");
        ele.remove();
    }

    constructor() {
        const xmlData = `
        <node>
            <node label="标准图标1" icon="iconfont iconfont-e231" selected="true"></node>
            <node label="标准图标2" icon="iconfont iconfont-e261"></node>
            <node label="标准图标3" icon="iconfont iconfont-e2f6"></node>
            <node label="标准图标4" icon="iconfont iconfont-e2d4"></node>
            <node label="标准图标5" icon="iconfont iconfont-e17c"></node>
            <node label="标准图标6" icon="iconfont iconfont-e0d1"></node>
            <node label="标准图标7" icon="iconfont iconfont-e191"></node>
            <node label="标准图标8" icon="iconfont iconfont-e54a"></node>
            <node label="标准图标9" icon="iconfont iconfont-e212"></node>
            <node label="标准图标10" icon="iconfont iconfont-e367"></node>
        </node>
    `;
        this.navData.fromXML(xmlData);
    }

    // singularGuideData: BubbleNoviceGuideNotice = { tagName: 'li', property1: { property: 'innerText', value: '菜单6' }, notice: '这是一条新手指引', version: '0.0.1', position: 'bottom' };
    bubbleNotice: BubbleNoviceGuideNotice = { type: NoviceGuideNoticeType.bubble, notice: '这是一条新手指引' };
    singularGuide: SingularNoviceGuide = { notice: this.bubbleNotice, tagName: 'li', property1: { property: 'innerText', value: '菜单6' }, version: '0.0.1', position: 'bottom' }

    singularGuideData2: SingularNoviceGuide = { notice: '这是一条新手指引', tagName: 'div', classes: 'jigsaw-nav-menu-item-top', property1: { property: 'innerText', value: '标准图标2' }, version: '0.0.1', position: "right" }

    singularGuideData3: SingularNoviceGuide = { notice: { type: NoviceGuideNoticeType.bubble, notice: '这是一条新手指引' }, tagName: 'div', classes: 'footer copyright', version: '0.0.1', position: "top" }

    singularGuideData4: SingularNoviceGuide = { notice: { type: NoviceGuideNoticeType.bubble, notice: '这是一条新手指引' }, tagName: 'div', id: "ad", version: '0.0.1', position: 'left' }

    singularGuideData5: SingularNoviceGuide = { notice: '这是收起按钮，可以收起菜单。', tagName: 'i', classes: 'jigsaw-nav-menu-toggle-button-arrow', version: '0.0.1', position: "right" }

    guideData = [this.singularGuide, this.singularGuideData2, this.singularGuideData3, this.singularGuideData4, this.singularGuideData5]
    // guideData = [this.singularGuideData2]

    noviceGuideEleArr = [];

    config: NoviceGuideConfig = {
        localStorageItem: 'jigsaw.noviceGuide',
        resetLocalStorage: true
    }

    ngOnInit() {
        jigsawGuide.show(this.guideData, this.config);
    }

    xy() {
        const queryResult = document.body.querySelectorAll('li#guide1');
        const { left, top, width, height } = queryResult[0].getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
    }

    delteGuideContainer() {
        const cntr = document.getElementById('novice-guide-container');
        if (cntr === null) {
            return;
        }
        cntr.remove();
    }

    clear() {
        jigsawGuide.clear();
    }

    bubbleGuide() {
        jigsawGuide.show(this.guideData, this.config);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
