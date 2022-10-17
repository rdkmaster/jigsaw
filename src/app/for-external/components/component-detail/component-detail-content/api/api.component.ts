import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ComponentMenuService} from "../../../service/component.service";
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['../../../../common/jigsaw-markdown/jigsaw-markdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApiComponent implements OnInit {
  private _loadingText = '<span style="color: #999; font-size: 20px">Loading...</span>';
  private _docNotFound = '<h1 style="color: #666">找不到这个文档！！</h1>';

  apiContent: string = this._loadingText;
  isMarkdown: boolean = true;
  mdUrl: string = '';
  apiUrl: string;

  constructor(private componentService: ComponentMenuService,
              private route: ActivatedRoute, private router: Router,
              private http: Http) {
  }

  ngOnInit() {
    this.route.url.subscribe(() => {
      const url = this.docUrl;
      if (!url) {
        this.isMarkdown = false;
        this.apiContent = this._docNotFound;
        return;
      }

      if (this.apiUrl === url) {
        return;
      }
      this.apiUrl = url;

      setTimeout(() => {
        // reset scroll height
        this.componentService.perfectScrollbar.scrollToY(0, 10);
      }, 20);

      this.isMarkdown = !!url.match(/.+\.md$/i);
      if (this.isMarkdown) {
        this.mdUrl = this.addTimestamp(url);
        return;
      }

      this.apiContent = this._loadingText;

      // html 类型的，需要去读取他的内容
      const subscription = this.http.get(this.addTimestamp(url))
        .map(resp => resp.text())
        .catch(err => {
          return Observable.create(subscriber => {
              subscriber.next('<div><img src="doc/ued-design/img/UED-developing.png" alt=""></div>');
              subscriber.complete()
            }
          )
        })
        .subscribe((html: string) => {
          this.apiContent = html;

          setTimeout(() => {
            const $anchor = $(`[name="${location.hash.substring(1)}"]`);
            if ($anchor.length > 0) {
              this.componentService.perfectScrollbar.scrollToY($anchor.offset().top - 64, 10);
            }
          }, 30);

          subscription.unsubscribe();
        });
    });
  }

  private addTimestamp(url) {
    const timestamp = parseInt(+new Date/86400 + '');
    const splitter = url.includes('?') ? '&' : '?';
    return `${url}${splitter}_ts=${timestamp}`;
  }

  private get docUrl() {
    const match = this.router.url.match(/^\/components(\/api)?\/([_A-z0-9-]+)\/([_A-z0-9-]+)(#.*)?$/);
    let url = '';
    if (!match) {
      return url;
    }

    if (match[1] === '/api') {
      // 从“API手册”点进来的api请求
      url = `jigsaw-doc/fragments/${match[2]}/${match[3]}.html`;
    } else {
      const menu = this.componentService.getComponentMenuNav(match[2], match[3]);
      url = menu ? menu.api : '';
    }

    return url;
  }

  private getApiContent(): Observable<any> {
    const url = this.docUrl;
    return !url ? Observable.of(this._docNotFound) : this.http.get(url)
      .map(resp => resp.text())
      .catch(err => {
        return Observable.create(subscriber => {
            subscriber.next('<div><img src="doc/ued-design/img/UED-developing.png" alt=""></div>');
            subscriber.complete()
          }
        )
      })
  }
}
