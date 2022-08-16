import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ComboSelectTextService {
    public text: object = {
        introduction: `
            # Combo Select 组合框

            将动作或菜单折叠到下拉菜单中。

            ## 使用场景

            当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        autoWidth: `
            ### 宽度自动对齐

            演示了如何实现下拉视图的宽度自动与组件对齐。

            由于\`open\`属性默认值为true，因此combo的下拉视图默认会直接打开。
        `,
        dropDownStatus: `
            ### 下拉视图的状态

            下拉视图的状态 - 请关注这个demo的下拉视图的各个组件的值的变化。

            原则是：**combo在每次打开下拉的时候，会重新实例化一个新的视图**，而不是复用之前已经打开过的视图。为了说明这一点，
            你可以在“密码”栏里输入任意文本，然后鼠标移开再移入让combo重新打开一次下拉，注意密码框里的文本被清空了，即状态被重置了。

            得益于这个原则，应用实现下拉部分的时候，就不需要为视图的状态而苦恼了，这样代码会简单一些。

            **在一些特定的情况，我们需要保持状态，应该怎么办呢？**可以看“姓名”栏的做法，在本组件创建一个变量用于持久化状态，
            得益于强大的双向绑定功能，我们一行代码都不需要写就可以将我们需要的状态给保持下来。
        `,
        events: `
            ### 事件

            #### \`select\`事件

            在用户单击了combo组件的选中项的时候，发出这个事件。应用可以通过这个事件在自定义下拉部分和combo组件之间做出很好的互动的功能。
            如这个demo演示的效果，在单击了选中城市之后，下拉中对应的城市会改变状态。

            这个事件可以让应用自定义的功能与combo组件之间完美的融合在一起，从而给用户提供一个更好更统一的使用体验。

            建议在应用自定义的下拉部分比较复杂的情况下，多多使用这个这个事件，以求获得最佳的使用体验。

            #### \`remove\`事件

            在用户删除了选中项之后，combo组件发出这个事件。通过这个事件，应用可以及时的更新下拉部分的状态以保持与combo选中列表一致。
        `,
        maxHeight: `
            ### 设置高度

            演示了combo-select如何设置高度和实现多行滚动显示。

            设置单行显示时，需要设置height为32px，如果设置了比32px小，我们会限制在32px。
        `,
        single: `
            ### 设置combo为单选模式

            \`autoClose="true"\`属性可以让combo在选中值有变化的时候自动关闭下拉，再配合下拉视图的单选状态可以让combo进入典型的单选模式。
        `,
        open: `
            ### 编程方式打开下拉部分
        `,
        searchable: `
            ### 过滤

            演示了如何使用关键字过滤的功能，包括浏览器内部数据过滤，和服务端数据过滤。

            Jigsaw提供了很多数据封装对象用于处理各种场景下的数据，熟悉和善于利用这些数据封装对象会减少很多重复性的工作。

            本demo涉及到的数据对象有：
            - 这里的浏览器内部数据过滤就使用到了[LocalPageableArray](/components/api/class/LocalPageableArray)对象，
            它专门用于对一笔已经存在于浏览器内存中的数据做分页、过滤、排序等，受限于浏览器的内存，这个数据对象一般不会用于数据量特别大的场合。
            - 这里的服务端数据过滤功能使用到了[PageableArray](/components/api/class/PageableArray)对象，
            它的功能和和[LocalPageableArray](/components/api/class/LocalPageableArray)类似，
            但是所有的操作都是在服务端进行，由于[PageableArray](/components/api/class/PageableArray)对象不受浏览器内存的约束，
            因此它非常适合用于对海量数据的分页、过滤、排序等操作，是最常用的数据对象之一。

            扩展：[了解Jigsaw的数据体系的详情](/components/api/interface/IComponentData)。
        `,
        setWidth: `
            ### 设置宽度

            drop down的宽度总是不小于combo-select的宽度。

            drop down自定义宽度,在drop down内容中设置。
        `,
        textTag: `
            ### 文本样式

            利用textTag属性来控制文本的表现形式。
        `,
        trigger: `
            ### 触发下拉框方式
        `
    }
}
