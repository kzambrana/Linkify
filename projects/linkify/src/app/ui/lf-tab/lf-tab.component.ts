import {Component, input, output} from '@angular/core';

@Component({
  selector: 'lf-tab',
  templateUrl: './lf-tab.component.html',
  styleUrls: ['./lf-tab.component.scss']
})
export class LfTabComponent {
  text = input<string>('');
  iconSrc = input<string>('');
  active = input<boolean>(false);
  tabClick = output<void>();

  public handleClick(): void {
    this.tabClick.emit();
  }
}
