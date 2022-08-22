import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UploadTextService {
    public text = {
        introduction: `
            # Upload 文件上传

            将文件/参数上传到网页。

            ## 使用场景

            - 单文件或多文件上传。
            - 上传文件到页面本身已有的容器中。
            - 需要进度详情显示，一般用于上传文件较大的情况。
            - 参数与文件一起上传。
            - 单文件手动上传。

            ## 示例
        `,
        basic: `
            ### 基本用法

            本demo展示了\`jigsaw-upload\`组件的基本用法

            鼠标放到每个文件所属行，出现删除图标，可对已上传/待上传的文件进行删除。

            #### 注意

            为了便于应用在更多的场合实现文件上传功能，文件上传功能与文件上传结果显示功能两部分可以单独使用， 其中执行上传功能的部分以\`j-upload / jigsaw-upload\`
            指令的形式存在,详情请[参考这个demo](/#/components/upload/demo/directive)。

            结果展示的功能，则以\`j-upload-result / jigsaw-upload-result\`组件的形式存在， 详情请[参考这个demo](/#/components/upload/demo/upload-result)。
        `,
        single: `
            ### 仅支持单个文件
        `,
        hideResults: `
            ### 不显示结果
        `,
        profileType: `
            ### 配置文件类型
        `,
        manualUpload: `
            ### 手动上传
        `,
        manualClear: `
            ### 手动清空
        `,
        setSize: `
            ### 自定义宽高
        `,
        contentField: `
            ## 设置字段名

            本demo演示了如何设置数据字段名和文件名字段名。

            不同的服务器可以接受的数据字段名可能会各不相同，Web上必须使用对应的字段名才能让传输过去的数据被服务器接受。
            此外，对于原文件名如果包含汉字，服务端收到的文件名将出现乱码，为了解决这个问题，Jigsaw将原文件名使用uri编码后，
            作为第二个字段传输给服务端，服务端可以读取第二个字段的值并做uri解码来得到正确的文件名，传输文件名的第二个字段是可选的。

            关于默认值：

            - contentField的默认值是file
            - fileNameField的默认值是filename

            最后，如果你的服务端是一个非常老的rdk服务端，则必须将第二个字段名清空，以确保数据能够正常的上传给这些rdk服务端。

            #### 注意

            为了便于便于应用在更多的场合实现文件上传功能，Jigsaw将文件上传的功能与文件上传结果的显示两部分拆开，
            其中执行上传功能的部分以\`j-upload / jigsaw-upload\`指令的形式存在。 而结果展示的功能，则以 jigsaw-upload-result 组件的形式存在，
            详情请[参考这个demo](#/components/upload/demo/upload-result)。
            本demo并未展示文件上传的结果，完整的用法请[参考这个demo](#/components/upload/demo/upload-result)。
        `,
        uploadResult: `
            ## Upload指令面板

            \`jigsaw-upload\`指令实现了\`IUploader\`接口，它可以与\`jigsaw-upload-result\`组件配合使用，作为\`jigsaw-upload\`指令的结果可视化显示器。

            \`jigsaw-upload-result\`组件是\`IUploader\`上传结果的可视化显示器，它无法独立使用，必须配合实现了IUploader的类来使用。

            提示：这里上传的所有结果都是模拟出来的，包括上传失败和失败的原因都是随机模拟出来的。
        `,
        toggleAutoUpload: `
            ## 选择文件后不会自动上传

            这个demo展示了如何通过控制上传指令的uploadImmediately属性来控制不同的文件上传方式。

            \`jigsaw-upload-result\`组件是\`IUploader\`上传结果的可视化显示器，它无法独立使用，必须配合实现了IUploader的类来使用。
        `,
        changeTargetUrl: `
            ## 修改目标URL

            这个demo复现了在动态修改目标URL时上传指令的一个问题。

            提示：这里上传的所有结果都是模拟出来的，包括上传失败和失败的原因都是随机模拟出来的。
        `,
        directive: `
        ## Upload指令

        本demo展示了\`jigsaw-upload\`指令的基本用法。
        `
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        single: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./single/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./single/demo.component.ts').default }
        ],
        hideResults: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./hide-results/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./hide-results/demo.component.ts').default }
        ],
        profileType: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./profile-type/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./profile-type/demo.component.ts').default }
        ],
        manualUpload: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./manual-upload/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./manual-upload/demo.component.ts').default }
        ],
        manualClear: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./manual-clear/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./manual-clear/demo.component.ts').default }
        ],
        setSize: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./set-size/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./set-size/demo.component.ts').default }
        ],
        contentField: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./content-field/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./content-field/demo.component.ts').default }
        ],
        uploadResult: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./upload-result/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./upload-result/demo.component.ts').default }
        ],
        toggleAutoUpload: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./toggle-auto-upload/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./toggle-auto-upload/demo.component.ts').default }
        ],
        changeTargetUrl: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./change-target-url/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./change-target-url/demo.component.ts').default }
        ],
        directive: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./directive/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./directive/demo.component.ts').default }
        ]
    }
}
