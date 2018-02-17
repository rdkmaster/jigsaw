import {Component} from '@angular/core';
import {JigsawNotification} from "jigsaw/component/notification/notification";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .wrapper {
            width: 380px;
            margin: auto;
            overflow: hidden;
        }

        .row {
            margin: 6px;
        }

        h4 {
            margin: 6px 0 18px 6px;
        }
        
        jigsaw-button {
            margin: 0 6px 6px 6px;
        }
        
        label {
            width: 30px;
        }
        
        jigsaw-input {
            width: 300px;
        }

        jigsaw-slider {
            width: 270px;
        }
    `]
})
export class NotificationFullDemoComponent {
    message = '这是一个 <b>很棒的</b> 消息提示框！';
    caption = undefined;  // this is the default value
    position = undefined; // this is the default value
    icon = undefined;     // this is the default value
    timeout = 8;          // this is the default value
    width = 350;          // this is the default value
    height = 0;           // this is the default value

    showWithOptions() {
        JigsawNotification.show(this.message, {
            caption: this.caption, position: this.position, icon: this.icon,
            timeout: this.timeout * 1000, width: this.width, height: this.height
        });
    }

    showNormal() {
        JigsawNotification.show('最简洁方便的使用方式：<code>JigsawNotification.show("message")</code>');
    }

    showCaption() {
        JigsawNotification.show(
            '带有标题的使用方式：<code>JigsawNotification.show("message", "caption")</code>',
            '我是一个很长的标题，真的很长很长很长很长很长很长很长很长很长很长');
    }

    showButtons() {
        JigsawNotification.show(
            '支持通过按钮的方式与用户交互，用户选择的按钮会被传递给回调函数。' +
            '虽然交互方式较为单一，但是简单便捷，推荐使用。<br><br>' +
            '这是一个很棒的提示框，你同意吗？',
            {
                callback: answer => alert(answer ? '你的答案是：' + answer.label : '看来对于这个问题你很犹豫...'),
                // 支持 jigsaw-button 的所有选项
                buttons: [{label: '同意！', type: 'primary'}, {label: '不好说'}], icon: 'fa fa-question'
            });
    }

    investigate(result) {
        alert('你的答案是：' + result);
    }

    starJigsaw() {
        window.open('https://github.com/rdkmaster/jigsaw', '_blank');
    }

    customizeInteractive() {
        JigsawNotification.show(
            '提示：消息体支持基础html片段，因此可以使用 ' +
                     '<code>a</code> / <code>button</code> 等标签可以实现自定义交互。<br><br>' +
                     '以上提示信息是否有用？我认为 <button onclick="investigate(\'有用\')">有用</button> ' +
                     '<button onclick="investigate(\'没用\')">没用</button><br><br>' +
                     '如果你喜欢这个提示框，那请帮我们<a onclick="starJigsaw()">点个星星</a>。',
            {
                width: 500,
                // 这个 innerHtmlContext 是实现自定义交互的必选项，
                // 它指定了 a / button 标签的 onclick 的值（是一个函数）是在哪个对象上定义的，
                // 推荐将这些函数都定义在当前组件内，因此他的值一般设置为 this 即可
                innerHtmlContext: this
            });
    }
}
