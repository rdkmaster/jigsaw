import {noviceGuide, NoviceGuideNoticeType} from "./novice-guide";

describe('Unit Test for novice-guide.ts', () => {

    /**
     * 一次只显示一个提醒
     */
    it('should show bubble guide', function () {
        noviceGuide([
            {
                version: 'v1', tagName: 'div', id: '', classes: 'aa bb', timeout: 0,
                notice: '<span style="xx">xxxxxxxxx</span>'
            },
            {
                version: 'v1', tagName: 'div', id: '', classes: 'aa1 bb', timeout: 20,
                notice: '<img src="data:image/png;xxxxxxxxxxxx">'
            },
            {
                version: 'v1', tagName: 'div', id: '', classes: 'aa bb', timeout: 0,
                notice: {
                    type: NoviceGuideNoticeType.dialog, title: 'the title', notice: 'the notice', useHtml: false
                }
            },
            {
                version: 'v1', tagName: 'div', id: '', classes: 'aa2 bb', timeout: 20,
                // show plain text bubble
                notice: {
                    type: NoviceGuideNoticeType.bubble, notice: 'plain text notice', useHtml: false
                }
            },
            {
                version: 'v1', tagName: 'i', id: '', classes: 'iconfont iconfont-e179 icon-menu', timeout: 20,
                notice: {
                    type: NoviceGuideNoticeType.dialog, title: 'the title',
                    notice: '<img src="data:image/png;xxxxxxxxxxxx">',
                    useHtml: true
                }
            }
        ])
    });

    /**
     * 显示连续多个dialog/bubble向导，
     * - 此时如果是dialog类型的提示，则会提供下一步按钮，以遍历所有提示
     * - 此时如果是bubble类型的提示，则会同时将他们都显示出来
     */
    it('should show dialog guide', function () {
        noviceGuide([
            {
                version: 'v1', tagName: 'div', id: '', classes: 'aa bb', timeout: 0,
                // 这2个是bubble式的提示，会同时将他们都显示出来，每一个气泡都有独立的叉叉可以关闭
                notices: [
                    '<img src="data:image/png;xxxxxxxxxxxx">',
                    {
                        type: NoviceGuideNoticeType.bubble, title: 'the title',
                        notice: '<img src="data:image/png;xxxxxxxxxxxx">',
                        useHtml: true
                    }
                ]
            },
            {
                version: 'v1', tagName: 'div', id: '', classes: 'aa bb', timeout: 0,
                // 这3个是dialog式的提示，会合并后提供下一步来遍历
                notices: [
                    {
                        type: NoviceGuideNoticeType.dialog, title: 'the title',
                        notice: '<img src="data:image/png;xxxxxxxxxxxx">',
                        useHtml: true
                    },
                    {
                        type: NoviceGuideNoticeType.dialog, title: 'the title',
                        notice: '<img src="data:image/png;xxxxxxxxxxxx">',
                        useHtml: true
                    },
                    {
                        type: NoviceGuideNoticeType.dialog, title: 'the title',
                        notice: '<img src="data:image/png;xxxxxxxxxxxx">',
                        useHtml: true
                    },
                ]
            },
        ])
    });

    /**
     * wizard类型的向导会强制要求用户跟着向导操作，到时候界面上会有个蒙层覆盖除了目标控件外的其他区域，用户只能点击那个区域
     * steps数组里，除了最后一个元素可以是bubble类型外，其他的必须是wizard类型
     */
    it('should show wizard guide', function () {
        noviceGuide([
            {
                version: 'v1', tagName: 'div', id: '', classes: 'aa bb', timeout: 0,
                steps: [
                    {
                        tagName: 'div', id: '', classes: 'aa bb',
                        notice: {
                            type: NoviceGuideNoticeType.wizard,
                            notice: '<span style="xx">xxxxxxxxx</span>'
                        }
                    },
                    {
                        tagName: 'div', id: '', classes: 'aa bb',
                        notice: {
                            type: NoviceGuideNoticeType.wizard,
                            notice: '<span style="xx">xxxxxxxxx</span>'
                        }
                    },
                    '<span style="xx">xxxxxxxxx</span>',
                ]
            },
        ])
    });
});
