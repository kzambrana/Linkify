import {Component, input, output} from '@angular/core';

@Component({
  selector: 'lf-tab',
  templateUrl: './lf-tab.component.html',
  styleUrls: ['./lf-tab.component.scss']
})
export class LfTabComponent {
  public text = input<string>('');
  public iconSrc = input<string>('');
  public active = input<boolean>(false);
  public tabClick = output<void>();

  public handleClick(): void {
    this.tabClick.emit();
  }
}
