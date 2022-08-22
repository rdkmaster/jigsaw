import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IconsTextService {
    public text = {
        introduction: `
            # Icons 所有icon-font图标

            这个demo列举了所有icon-font图标，可以直接使用，Jigsaw已经不建议使用FontAwesome图标了，建议全部改用Jigsaw内置的图标。

            ## 示例
        `
    }
}
