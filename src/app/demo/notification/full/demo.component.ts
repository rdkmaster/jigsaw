import {Component} from '@angular/core';
import {JigsawNotification} from "jigsaw/component/notification/notification";

@Component({
    templateUrl: './demo.component.html'
})
export class NotificationFullDemoComponent {
    showNormal() {
        JigsawNotification.show('最简洁方便的使用方式：<code>JigsawNotification.show("message")</code>');
    }

    showCaption() {
        JigsawNotification.show(
            '带有标题的使用方式：<code>JigsawNotification.show("message", "caption")</code>',
            '我是一个很长的标题，真的很长很长很长很长很长很长很长很长很长很长');
    }

    showWithoutTimeout() {
        JigsawNotification.show(
            '默认8秒后自动关闭，如果需要修改这个时间，或者关闭自动功能，则需要使用选项参数来控制：<br>' +
                     '<code>JigsawNotification.show("message", {timeout: 0})</code><br>' +
                     '提示：<code>timeout</code>为0表示不自动关闭。',
            {timeout: 0});
    }

    showOptionDescription() {
        JigsawNotification.show('<a href="">单击这里</a>查看目前支持的所有选项。');
    }

    showButtons() {
        JigsawNotification.show(
            '支持通过按钮的方式与用户交互，用户选择的按钮会被传递给回调函数。<br>这是一个很棒的提示框，你同意吗？',
            {
                callback: answer => alert(answer ? '你的答案是：' + answer.label : '看来对于这个问题你很犹豫...'),
                // 支持 jigsaw-button 的所有选项
                buttons: [{label: '同意！', type: 'primary'}, {label: '不好说'}]
            });
    }
}
