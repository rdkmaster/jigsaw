import { Type } from '@angular/core';
import { IJigsawTabTitleRenderer } from "./tab-renderer";

export type TabBarData = {
    /**
     * 字符串类型的标题
     */
    label?: string,
    /**
     * 支持包含简单标签的HTML片段
     */
    html?: string,
    /**
     * 当配置了HTML内容时，搭配该属性，可以指定HTML运行的上下文
     */
    htmlContext?: any,
    disabled?: boolean,
    hidden?: boolean,
    /**
     * 显示在文本前面的图标
     */
    icon?: string,
    renderer?: Type<IJigsawTabTitleRenderer>
}

/**
 * 改变tab标题时发送事件的携带数据类型。
 */
export type TabTitleInfo = {
    key: number;
    title: string
}

export type TabBarStyleOptions = {
    barStyles?: {
        /**
        * 标签栏背景填充
        */
        backgroundFill?: string;
    },
    normalStyles?: {
        /**
        * 标签背景填充
        */
        backgroundFill?: string;
        /**
         * 标签文字颜色
         */
        textColor?: string,
    },
    selectedStyles?: {
        /**
        * 标签选中背景填充
        */
        backgroundFill?: string;
        /**
         * 标签选中文字颜色
         */
        textColor?: string,
    },
    hoverStyles?: {
        /**
        * 标签悬浮背景填充
        */
        backgroundFill?: string;
        /**
         * 标签悬浮文字颜色
         */
        textColor?: string,
    },
    disabledStyles?: {
        /**
        * 标签禁用背景填充
        */
        backgroundFill?: string;
        /**
         * 标签禁用文字颜色
         */
        textColor?: string,
    }
}

export type TabStyleOptions = {
    tabBarStyles?: TabBarStyleOptions;
    contentStyles?: {
        /**
        * 内容区背景填充
        */
        backgroundFill?: string;
    }
}