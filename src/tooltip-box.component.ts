import { Component, Input, ElementRef, Renderer2, HostBinding, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { animate, trigger, style, state, transition } from '@angular/animations';

@Component({
  selector: 'tooltip-box',
  template: '<span [innerHtml]="text"><span>',
  animations: [
    trigger('fade', [
      state('visible', style({ opacity: 1})),
      state('invisible', style({ opacity: 0 })),
      transition('visible <=> invisible', animate('300ms linear'))
    ])
  ],
  styles: [
      `
          :host {
              background-color: rgba(102,102,102,102);
              color: white;
              display: inline-block;
              position: fixed;
              padding: 5px 15px;
              font-size: 11sp;
          }
    `,
      `
          :host.has-arrow:before {
              content: '';
              border: 5px solid transparent;
              position: absolute;
              width: 0;
              height: 0;
          }
    `,
    ':host.has-arrow.arrow-top:before { border-bottom: 5px solid rgba(102,102,102,102); top: -10px; }',
    ':host.has-arrow.arrow-left:before { border-right: 5px solid rgba(102,102,102,102); left: -10px; }',
    ':host.has-arrow.arrow-right:before { border-left: 5px solid rgba(102,102,102,102); right: -10px; }',
    ':host.has-arrow.arrow-bottom:before { border-top: 5px solid rgba(102,102,102,102); bottom: -10px; }'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipBox implements AfterViewInit {

  @HostBinding('@fade') fadeState: string = 'invisible';

  @Input()
  text: string;

  @Input()
  set arrow(side: string) {
    this.rnd.setAttribute(this.getNativeElement(), 'class', 'has-arrow ' + 'arrow-' + side);
  }

  @Input()
  set posTop(val: number) {
    this.rnd.setStyle(this.getNativeElement(), 'top', val + 'px');
  }

  @Input()
  set posLeft(val: number) {
    this.rnd.setStyle(this.getNativeElement(), 'left', val + 'px');
  }

  getNativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  init: Promise<void>;

  private initResolve: Function;

  constructor(public elementRef: ElementRef, private rnd: Renderer2) {
    this.init = new Promise<void>(resolve => {
      this.initResolve = resolve;
    });
  }

  ngAfterViewInit() {
    this.initResolve();
  }

}
