import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with <span style="color: red;">♥</span> by <b><a href="http://accent.tn/" target="_blank">ACCENT</a></b> 2023
    </span>
  `,
})
export class FooterComponent {
}
