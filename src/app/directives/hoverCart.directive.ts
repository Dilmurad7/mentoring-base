import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: '[hoverCart]',
  standalone: true
})

export class HoverHighlightDirective {
  constructor( private el: ElementRef, private renderer: Renderer2) {}
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'yellow');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'black');
  }
}
