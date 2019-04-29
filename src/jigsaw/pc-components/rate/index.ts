import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JigsawRateComponent } from './rate';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JigsawRateComponent],
  exports: [JigsawRateComponent]
})
export class JigsawRateModule { }

export * from './rate';
