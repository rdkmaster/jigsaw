import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class DragDropTextService{
    public text: object = {
        introduction: `
        # Drag and Drop 拖拽
        本demo演示了如何自定义一个简单的单元格拖拽渲染器，Jigsaw已经实现了一个内置的单元格拖拽渲染器，建议优先使用。
        ## 示例
        `,
        dragToReplace: `
        ### 拖动
        `,
        simpleTableDragDrop: `
        ### 简单表格拖动
        本demo演示了如何自定义一个简单的单元格拖拽渲染器，Jigsaw已经实现了一个内置的单元格拖拽渲染器，建议优先使用。
        `,
    }
}
