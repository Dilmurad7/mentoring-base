import { Directive, ElementRef, inject } from "@angular/core";

@Directive({
  selector: '[red]',
  standalone: true
}
)
export class RedDirective{
  private readonly ElementRef = inject(ElementRef);

  constructor() {
this.ElementRef.nativeElement.style.backgroundColor = 'red'
  }
}
