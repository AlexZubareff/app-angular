import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appBlocksStyle]',
  host: {
    '(document:keyup)': 'initKeyUp($event)',
  },
  exportAs: 'blockStyle',
})
export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges {
  @Input() selector: string;
  @Input() initFirst: boolean = false;

  @Output() renderComplete = new EventEmitter();

  private items: HTMLElement[];
  private index: number = 0;
  public activeElementIndex: number;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.activeElementIndex = 0;
    if (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);

      if (this.initFirst) {
        if (this.items[0]) {
          (this.items[0] as HTMLElement).setAttribute(
            'style',
            'border: 2px solid red'
          );
        }
      }
    } else {
      console.error('No selector!');
    }

    setTimeout(() => {
      this.renderComplete.emit(true);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  initKeyUp(ev: KeyboardEvent): void {
    const indexCount = this.items.length;
    console.log(indexCount);

    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
      (this.items[this.index] as HTMLElement).removeAttribute('style');
    }

    if (ev.key === 'ArrowRight') {
      this.index++;
      console.log(this.index);
      if (this.items[this.index] && this.index <= indexCount) {
        (this.items[this.index] as HTMLElement).setAttribute(
          'style',
          'border: 2px solid red'
        );
      } else {
        this.index--;
        console.log(this.index);
        (this.items[this.index] as HTMLElement).setAttribute(
          'style',
          'border: 2px solid red'
        );
      }
    } else if (ev.key === 'ArrowLeft') {
      this.index--;
      console.log(this.index);
      if (this.index >= 0) {
        (this.items[this.index] as HTMLElement).setAttribute(
          'style',
          'border: 2px solid red'
        );
      } else {
        this.index++;
        console.log(this.index);
        (this.items[this.index] as HTMLElement).setAttribute(
          'style',
          'border: 2px solid red'
        );
      }
    }
    this.activeElementIndex = this.index;
  }

  initStyle(index: number) {
    console.log('Item index: ', this.items[index]);

    if (this.items[index]) {
      (this.items[index] as HTMLElement).setAttribute(
        'style',
        'border: 2px solid red'
      );
    }
  }
}
