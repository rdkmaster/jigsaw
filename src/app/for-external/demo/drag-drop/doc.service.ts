import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class DragDropTextService {
    public text = {
        introduction: `
        # Drag and Drop 拖拽

        ## 示例
        `,
        dragToReplace: `
        ### 拖动
        `,
        simpleTableDragDrop: `
        ### 简单表格拖动

        本demo演示了如何自定义一个简单的单元格拖拽渲染器，Jigsaw已经实现了一个内置的单元格拖拽渲染器，建议优先使用。

        Jigsaw内置了一个拖拽单元格渲染器，建议优先使用，[参考这里的行可拖动demo](#/demo/table-actions)
        `,
    }

    public codes = {
        dragToReplace: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./drag-to-replace/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./drag-to-replace/demo.component.ts').default }
        ],
        simpleTableDragDrop: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./simple-table-drag-drop/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./simple-table-drag-drop/demo.component.ts').default }
        ],
    }
}
