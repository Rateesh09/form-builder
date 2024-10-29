import { Component } from '@angular/core';
import { FormBuilderComponent } from './form-builder/form-builder.component'; // Import the standalone component

@Component({
  selector: 'app-root',
  template: `<app-form-builder></app-form-builder>`, // Embed the FormBuilder component
  standalone: true,
  imports: [FormBuilderComponent], // Import it into the AppComponent
})
export class AppComponent {}
