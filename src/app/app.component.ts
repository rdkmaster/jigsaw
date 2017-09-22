import {Component} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    jigsawTitle: string = 'jigsaw-title';

    constructor(http: HttpClient) {
        http
            .post('/rdk/service/app/example/server/my_service',
                {aa: 123, bb: 456},
                {observe: 'response'})
            .subscribe(r => {
                console.log(r);
            });
        http
            .request('delete','/rdk/service/app/example/server/my_service',
                {params: new HttpParams().set('id', '3'), body: "1231231"})
            .subscribe(r => console.log(r));
    }

    gotoPlunker(): void {
        //这是给临时演示网站准备的，后续ued正式上线了，还要再改一下
        let match = location.href.match(/\/#\/(.*?)(#|$)/);
        if (!match) {
            return;
        }
        const url = '/jigsaw/live-demo/' + match[1] + '/index.html';
        console.log(url);
        window.open(url, '_blank');
    }
}
