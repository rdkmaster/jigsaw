import { Component, OnInit, AfterViewInit } from "@angular/core";
import { SimpleTreeData } from 'jigsaw/public_api';
import { SingularNoviceGuide } from 'novice-guide/src/novice-guide';

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class JigsawNoviceGuideBasicDemoComponent implements OnInit, AfterViewInit {
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

    // singularGuideData: SingularNoviceGuide[] = [
    //     { tagName: 'li', id: "guide1", notice: '这是一条新手指引', version: '0.0.1' },
    //     { tagName: 'div', property1: { property: 'innerText', value: '标准图标2' }, notice: '这是一条新手指引', version: '0.0.1' }
    // ];

    singularGuideData: SingularNoviceGuide = { tagName: 'li', id: "guide1", notice: '这是一条新手指引', version: '0.0.1' };

    singularGuideData2: SingularNoviceGuide = { tagName: 'div', property1: { property: 'innerText', value: '标准图标2' }, notice: '这是一条新手指引', version: '0.0.1' }

    test(data) {
        const tagName = data.tagName ? data.tagName.toUpperCase() : '';
        const id = data.id ? '#' + data.id : '';
        const classes = data.classes ? data.id : '';
        const selector = `${tagName}${id}`;
        const queryResult = document.body.querySelectorAll(selector);
        console.log(queryResult)

        if (queryResult.length === 1) {
            const { left, top, width, height } = queryResult[0].getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            console.log(queryResult[0], left, top, width, height)
            let guideEle = document.createElement('div');

            document.body.appendChild(guideEle);
            guideEle.style.position = "absolute";
            guideEle.style.top = centerY + 'px';
            guideEle.style.left = centerX + 'px';
            guideEle.style.width = "40px";
            guideEle.style.height = "40px";
            guideEle.style.background = "cyan";

            const observer = new IntersectionObserver(entries => {
                console.log(entries);

            })
            observer.observe(queryResult[0])

        } else {
            const mutationObserver = new MutationObserver(entries => {

                const addedNodes = entries.filter(m => m.addedNodes?.length > 0);
                if (addedNodes.length == 0) {
                    return;
                }
                const filterResult = addedNodes.filter(node => {
                    const tagFilter = node.target.nodeName === tagName;
                    const idFilter = node.target["id"] === id;
                    const classFilter = node.target["classList"] === classes;
                    const property1Filter = node.target[data.property1.property] === data.property1.value;
                    // console.log(data.property1)
                    return tagFilter && idFilter && property1Filter;
                })
                console.log(filterResult[0]);
                console.log(filterResult[0].target);
                // if (filterResult.length === 1) {
                //     const { left, top, width, height } = filterResult[0].target.getBoundingClientRect();
                //     const centerX = left + width / 2;
                //     const centerY = top + height / 2;
                // }
            })
            mutationObserver.observe(document.body, { childList: true, subtree: true })
        }
    }

    ngOnInit() {
        // console.log(document.body.querySelectorAll("div"))
        // console.log(document.body.querySelectorAll("li"))

        /* 在调用方法后，查询页面匹配元素 */
        /* 拼接selector */

        // 可以直接在获取数据之后处理


        // this.guideData.forEach(guide => {
        //     /* 拼接selector */
        //     const tagName = guide.tagName ? guide.tagName : '';
        //     const id = guide.id ? guide.id : '';
        //     const classes = guide.classes ? guide.id : '';
        // })
        this.test(this.singularGuideData);
        this.test(this.singularGuideData2);

        // window.onload = function () {
        //     console.log(123123)
        //     const queryResult = document.body.querySelectorAll('li#guide1');
        //     const { left, top, width, height } = queryResult[0].getBoundingClientRect();
        //     const centerX = left + width / 2;
        //     const centerY = top + height / 2;
        //     console.log(centerX, centerY)
        // }
    }

    ngAfterViewInit() {
        // this.xy()
    }

    xy() {
        const queryResult = document.body.querySelectorAll('li#guide1');
        const { left, top, width, height } = queryResult[0].getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        console.log(queryResult[0], left, top, width, height)
    }


    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
