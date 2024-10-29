import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormDefinitionService } from '../form-definition.service';
import { CommonModule } from '@angular/common'; 

@Component({
    selector: 'app-form-builder',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule], 
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.css'],
  })
export class FormBuilderComponent implements OnInit {
  dynamicForm: FormGroup;
  formDefinition: any[] = [];
  submittedData: any = null;

  constructor(
    private fb: FormBuilder,
    private formDefinitionService: FormDefinitionService
  ) {
    this.dynamicForm = this.fb.group({});
  }

  ngOnInit() {
    this.formDefinition = this.formDefinitionService.getFormDefinition();
    this.buildForm();
    this.dynamicForm.valueChanges.subscribe(() => {
        this.formDefinition.forEach((field) => this.isFieldVisible(field));
      })
  }

  buildForm() {
    this.formDefinition.forEach((field) => {
      const control = this.fb.control(
        '',
        field.validator.includes('required') ? Validators.required : null
      );
      this.dynamicForm.addControl(field.name, control);
      console.log('Control added:', field.name); 
    });
  }

  // Check if field is visible based on conditions
  isFieldVisible(field: any): boolean {
    if (!field.rules) return true; // No conditions, always visible

    return field.rules.every((rule: any) => {
      const fieldValue = this.dynamicForm.get(rule.field)?.value;
      switch (rule.operator) {
        case '!=':
          return fieldValue !== rule.value;
        case '>=':
          return fieldValue >= rule.value;
        case '<=':
          return fieldValue <= rule.value;
        default:
          return false;
      }
    });
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      this.submittedData = this.dynamicForm.value; // Store form data
      console.log('Form Data:', this.submittedData); // Log form data
      alert('Form submitted successfully!');
    } else {
      alert('Please fill all mandatory fields!');
    }
  }
}
