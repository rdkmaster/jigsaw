import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SearchInputTextService {
    public text = {
        introduction: `
            # Search 搜索框

            输入数据，在输入后进行搜索。

            ## 使用场景

            需要对数据进行搜索过滤。

            ## 示例
        `,
        autoSearch: `
            ### 自动搜索
        `,
        manualSearch: `
            ### 手动搜索
        `,
        debounce: `
            ### 自动搜索防抖
        `,
        historyStorageKey: `
            ### 使用不同的历史记录独立存储

            使用historyStorageKey属性可以控制多个搜索框使用不同的历史记录独立存储
        `
    }

    public codes = {
        autoSearch: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./auto-search/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./auto-search/demo.component.ts').default }
        ],
        manualSearch: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./manual-search/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./manual-search/demo.component.ts').default }
        ],
        debounce: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./debounce/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./debounce/demo.component.ts').default }
        ],
        historyStorageKey: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./history-storage-key/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./history-storage-key/demo.component.ts').default }
        ],
    }
}
