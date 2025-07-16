import {Component, input, output} from '@angular/core';

@Component({
  selector: 'lf-tab',
  templateUrl: './tab.component.html',
})
export class TabComponent {
  public text = input<string>('');
  public iconSrc = input<string>('');
  public active = input<boolean>(false);
  public tabClick = output<void>();

  public handleClick(): void {
    this.tabClick.emit();
  }
}
