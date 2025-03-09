import { Directive, ElementRef, Input, Renderer2, HostListener, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipTitle: string = '';
  tooltip: HTMLElement | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tooltipTitle'] && this.tooltip) {
      this.tooltip.innerHTML = this.tooltipTitle;
    }
  }

  @HostListener('mouseenter', ['$event']) onMouseEnter(event: MouseEvent) {
    if (!this.tooltip) {
      this.show(event);
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) {
      this.hide();
    }
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (this.tooltip) {
      this.updatePosition(event);
    }
  }

  private show(event: MouseEvent) {
    this.tooltip = this.renderer.createElement('span');
    this.tooltip!.innerHTML = this.tooltipTitle;
    this.renderer.appendChild(document.body, this.tooltip);
    this.renderer.addClass(this.tooltip, 'tooltip');
    this.renderer.setStyle(this.tooltip, 'position', 'absolute');
    this.renderer.setStyle(this.tooltip, 'pointerEvents', 'none');

    this.tooltip!.offsetWidth;
    this.updatePosition(event);
  }

  private updatePosition(event: MouseEvent) {
    const tooltipWidth = this.tooltip?.offsetWidth || 0;
    const top = event.clientY + 36;
    const left = event.clientX - tooltipWidth / 2;
    this.renderer.setStyle(this.tooltip, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }

  private hide() {
    this.renderer.removeChild(document.body, this.tooltip);
    this.tooltip = undefined;
  }
}
