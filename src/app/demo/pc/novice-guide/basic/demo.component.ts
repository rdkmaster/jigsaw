import { Component, OnInit } from "@angular/core";
import { SimpleTreeData } from 'jigsaw/public_api';
import { noviceGuide } from 'novice-guide/src/novice-guide';

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class JigsawNoviceGuideBasicDemoComponent implements OnInit {
    public navData: SimpleTreeData = new SimpleTreeData();

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

    guideData = [
        { tagName: 'li', id: "guide1", notice: '这是一条新手指引' },
        { tagName: 'div', property1: { property: 'innerText', value: '标准图标2' } }
    ];

    ngOnInit() {
        // noviceGuide([])
        this.guideData.forEach(guide => {

        })

        const mutationObserver = new MutationObserver(entries => {
            console.log(entries);
            
        })

        mutationObserver.observe(document.body, { childList: true, subtree: true })
    }


    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
