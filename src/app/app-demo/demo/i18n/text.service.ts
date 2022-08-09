import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class I18nTextService {
    public text: object = {
        introduction: `
            # Internationalization 国际化

            统一设置组件的国际化信息。

            ## 应用开发

            应用在app.component.ts中统一设置组件国际化信息，对于单个组件不需要再设置语言。 组件本身的文本以及语言接口，保持兼容，但是不建议再使用。 当应用设置了组件的文本信息时，以设置文本为准；其次根据应用设置的组件语言信息，获取文本；都未设置时，才使用应用统一设置的语言信息。

            ## 示例
        `
    }
}
