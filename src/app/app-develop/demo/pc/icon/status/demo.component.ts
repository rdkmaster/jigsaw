import {Component, ViewChild} from "@angular/core";
import {InternalUtils, JigsawIcon, StatusType} from "jigsaw/public_api";

const statuses: StatusType[] = ['success', 'warning', 'error', 'finish', 'disabled', 'process'];

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .icons {
            margin-right: 10px;
            margin-bottom: 16px;
        }
    `]
})
export class IconStatusDemoComponent {
    randomStatus: StatusType = 'success';
    fontSize = 12;

    @ViewChild('status')
    status: JigsawIcon;

    changeStatus1() {
        const newStatus = statuses[InternalUtils.randomNumber(0, statuses.length - 1)];
        this.status.updateStatus(newStatus);
    }

    changeStatus2() {
        this.randomStatus = statuses[InternalUtils.randomNumber(0, statuses.length - 1)];
    }

    @ViewChild('status1')
    status1: JigsawIcon;

    changeStatus3() {
        const labels = {
            success: '搞定了', warning: '好像有问题', error: '出错啦', finish: '结束了',
            disabled: '不能用', process: '处理中', custom: '自定义状态'
        };
        const icons = {
            success: 'iconfont iconfont-ea39', warning: 'iconfont iconfont-ea50',
            error: 'iconfont iconfont-e8e3', finish: 'iconfont iconfont-e41f',
            disabled: 'iconfont iconfont-e473', process: 'iconfont iconfont-e035',
            custom: 'iconfont iconfont-e77d'
        };
        const newStatus = statuses[InternalUtils.randomNumber(0, statuses.length - 1)];
        this.status1.updateStatus(newStatus, labels[newStatus], icons[newStatus]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个Demo演示了Icon组件的基本用法';
    description: string = '';
}
