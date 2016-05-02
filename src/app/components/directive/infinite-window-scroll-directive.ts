import {Directive, ElementRef, Input, Output,EventEmitter, Inject} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {WINDOW_PROVIDERS, WINDOW} from '../../../app/services/window-service.ts';

@Directive({
  selector: '[InfiniteWindowScroll]',
  providers: [ WINDOW_PROVIDERS ],
  host: {}  
})
export class InfiniteWindowScrollDirective{
  
  private _el: HTMLElement;  
  private counter = 1;
  private window: any;
  
  @Input('InfiniteWindowScroll') highlightColor: string;  
  @Output() scroll2 = new EventEmitter();
  
  constructor(el: ElementRef,
    @Inject(WINDOW) window){ 
    
      this._el = el.nativeElement;
      this.window = window; 
      
      let lastScroll = -1;
    
      console.log('constructor');
    
      const eventStream = Observable.fromEvent(window, 'scroll')
        .debounceTime(1000)
        .distinctUntilChanged();
    
      eventStream.subscribe(x => { 
      
        let scrollTop = window.document.body.scrollTop;
        let scrollHeight = window.document.body.scrollHeight;
        let windowHeight = window.innerHeight;

        console.log('windowHeight: ' + windowHeight + ', scrolltop: ' + scrollTop + ', scrollHeight: ' + scrollHeight);

        if (scrollTop + windowHeight >= scrollHeight){              
            console.log('subscribe');
            console.log('lastScroll: ' + lastScroll);
            
            if (scrollTop >= lastScroll){
              this.scroll2.emit({pageNumber: this.counter});
              this.counter += 1;     
              
              lastScroll = scrollTop;    
            }
          }    
          else{
            console.log('oops');
          }          
        });
  }
  
  ngOnInit(){
    this.scroll2.emit({pageNumber: this.counter});
    this.counter += 1;
    
    console.log('ngOnInit');
  }
}