import { Component, OnInit, AfterViewInit, ViewEncapsulation } from "@angular/core";
import { SimpleTreeData } from 'jigsaw/public_api';
import { SingularNoviceGuide, jigsawGuide, NoviceGuideConfig, MultipleNoviceGuide, NoviceGuide, NoviceGuideNoticeType } from 'novice-guide/src/novice-guide';

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

    singularGuideData: SingularNoviceGuide = { tagName: 'li', property1: { property: 'innerText', value: '菜单6' }, notice: '这是一条新手指引', version: '0.0.1', position: 'bottom' };

    singularGuideData2: SingularNoviceGuide = { tagName: 'div', classes: 'jigsaw-nav-menu-item-top', property1: { property: 'innerText', value: '标准图标8' }, notice: '这是一条新手指引', version: '0.0.1', position: "right" }

    singularGuideData3: SingularNoviceGuide = { tagName: 'div', classes: 'footer copyright', notice: { type: NoviceGuideNoticeType.bubble, notice: '这是一条新手指引' }, version: '0.0.1', position: "top" }

    singularGuideData4: SingularNoviceGuide = { tagName: 'div', id: "ad", notice: { type: NoviceGuideNoticeType.bubble, notice: '这是一条新手指引' }, version: '0.0.1', position: 'left' }

    guideData = [this.singularGuideData, this.singularGuideData2, this.singularGuideData3, this.singularGuideData4]
    // guideData = [this.singularGuideData2]

    noviceGuideEleArr = [];

    ngOnInit() {
        const config: NoviceGuideConfig = {
            localStorageItem: 'jigsaw.noviceGuide',
            resetLocalStorage: true
        }
        jigsawGuide.show(this.guideData, config);
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
