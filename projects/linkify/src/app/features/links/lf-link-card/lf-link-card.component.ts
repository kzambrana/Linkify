import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LfInputComponent} from '../../../ui/lf-input/lf-input.component';
import {LfDropdownComponent} from '../../../ui/lf-drop-down/lf-drop-down.component';
import {LfDropDownOption} from '../../../interfaces/lf-drop-down-option.interface';

@Component({
  selector: 'lf-link-card',
  imports: [
    LfInputComponent,
    LfDropdownComponent
  ],
  templateUrl: './lf-link-card.component.html',
  styleUrl: './lf-link-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LfLinkCardComponent {
  platformOptions: LfDropDownOption[] = [
    {label: 'GitHub', value: 'github', iconPath: 'lf-icon-github'},
    {label: 'Frontend Mentor', value: 'frontend-mentor', iconPath: 'lf-icon-fe-mentor'},
    {label: 'Twitter', value: 'twitter', iconPath: 'lf-icon-twitter'},
    {label: 'LinkedIn', value: 'linkedin', iconPath: 'lf-icon-linkedin'},
    {label: 'YouTube', value: 'youtube', iconPath: 'lf-icon-youtube'},
    {label: 'Facebook', value: 'facebook', iconPath: 'lf-icon-facebook'},
    {label: 'Twitch', value: 'twitch', iconPath: 'lf-icon-twitch'},
    {label: 'Dev.to', value: 'devto', iconPath: 'lf-icon-devto-dark'},
    {label: 'Codewars', value: 'codewars', iconPath: 'lf-icon-codewars'},
    {label: 'Codepen', value: 'codepen', iconPath: 'lf-icon-codepen'},
    {label: 'freeCodeCamp', value: 'free-code-camp', iconPath: 'lf-icon-free-code-camp'},
    {label: 'GitLab', value: 'gitlab', iconPath: 'lf-icon-gitlab'},
    {label: 'Hashnode', value: 'hashnode', iconPath: 'lf-icon-hashnode'},
    {label: 'Stack Overflow', value: 'stack-overflow', iconPath: 'lf-icon-stackoverflow'},
  ];

  public onPlatformSelect(option: LfDropDownOption): void {
  }
}
