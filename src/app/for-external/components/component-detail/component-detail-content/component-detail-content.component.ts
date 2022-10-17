import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute, Params, UrlSegment} from '@angular/router';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) {
  }

  transform(v: string, type?: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}

@Pipe({
  name: 'sanitizeResourceUrL'
})
export class SanitizeResourceUrLPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) {
  }

  transform(v: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(v);
  }
}

@Component({
  selector: 'app-component-detail-content',
  templateUrl: './component-detail-content.component.html',
  styleUrls: ['./component-detail-content.component.css']
})
export class ComponentDetailContentComponent implements OnInit {
  contentType: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.url.subscribe((segments: UrlSegment[]) => {
      this.contentType = segments[0].toString()
    });
  }
}
