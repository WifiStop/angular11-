import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[add-component]',
})
export class AddComponentDirective {
  constructor(
    public viewContainerRef: ViewContainerRef,
    public templateRef:TemplateRef<any>
    ) { }
}
