import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class IconBasicDemoComponent {

    public _$edit = '编辑';

    public _$icon = 'fa-edit';

    public _$url = 'http://rdk.zte.com.cn/home';

    public _$target = '_blank';

    public _$clickHandler() {
        alert('图标被点击');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawIcon'
    ];
}
