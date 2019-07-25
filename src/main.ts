import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

// angular6增加了一个破坏性修改，默认取消inline-block间的留白，这里通过preserveWhitespaces: true还原, issue https://github.com/angular/angular/issues/23764
platformBrowserDynamic().bootstrapModule(AppModule, { preserveWhitespaces: true });
