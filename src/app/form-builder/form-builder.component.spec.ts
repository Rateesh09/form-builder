import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilderComponent } from './form-builder.component';

describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent;
  let fixture: ComponentFixture<FormBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormBuilderComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form as invalid if required fields are missing', () => {
    component.dynamicForm.patchValue({ 'Order No': '' });
    expect(component.dynamicForm.valid).toBeFalse();
  });

  it('should validate conditional field visibility', () => {
    component.dynamicForm.patchValue({ OrderedDate: '2024-06-23' });
    expect(component.isFieldVisible(component.formDefinition[2])).toBeTrue();
  });
});
