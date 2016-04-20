import {Directive, ElementRef, Input, Output, EventEmitter} from 'angular2/core';

@Directive({
  selector: '[InfiniteScroll]',
  host: {
    '(scroll)': 'onScroll()',
  }  
})
export class InfiniteScrollDirective{
  
  private _el: HTMLElement;  
  private counter = 1;
  
  @Input('InfiniteScroll') highlightColor: string;  
  @Output() scroll2 = new EventEmitter();
  
  constructor(el: ElementRef){ 
    console.log('constructor');
    this._el = el.nativeElement; 
  }
  
  ngOnInit(){
    this.scroll2.emit({pageNumber: this.counter});
    this.counter += 1;
  }
  
  onScroll(){   
    if (this._el.scrollTop + this._el.offsetHeight >= this._el.scrollHeight){
      
      this.scroll2.emit({pageNumber: this.counter});
      this.counter += 1;
      
    }
  }
}