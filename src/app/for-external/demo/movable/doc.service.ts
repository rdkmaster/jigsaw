import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MovableTextService {
    public text: object = {
        introduction: `
            # Movable 可移动

            ## 示例
        `,
        basic: `
            ### 基础用法

            当一个对象既可以拖动又可以单击时，需要一些技巧来这两个操作带来的避免冲突。
        `
    }
}
