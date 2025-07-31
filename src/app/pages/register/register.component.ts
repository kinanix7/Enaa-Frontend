import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder, AbstractControl } from '@angular/forms';

interface User{
  name: string,
  email: string,
  password: string,
  role: 'FORMATEUR' | 'APRENANT'
}

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  users: User[] = [];
  registerForm !: FormGroup;
  isSubmitting = false;

  constructor (private service : AuthService, private fb: FormBuilder) {}

  ngOnInit():void{
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', [Validators.required]] // Changed default to empty string to force selection
    });
  }

  // Helper method to check if a field has errors and should show them
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Helper method to check if a field is valid and should show success state
  isFieldValid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  // Helper method to get specific error for a field
  getFieldError(fieldName: string, errorType: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.errors && field.errors[errorType]);
  }

  onSubmit():void{
    if(this.registerForm.valid){
      this.isSubmitting = true;

      // Mark all fields as touched to show any remaining validation errors
      this.markFormGroupTouched();

      try {
        this.users.push(this.registerForm.value);
        console.log('Form submitted:', this.registerForm.value);
        console.log('All users:', this.users);

        // Call your service
        this.service.register(this.registerForm.value);

        // Success feedback
        alert("Registration successful!");

        // Reset form after successful submission
        this.registerForm.reset();
        this.registerForm.patchValue({ role: '' }); // Reset role to empty

      } catch (error) {
        console.error('Registration error:', error);
        alert("Registration failed. Please try again.");
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched();
      console.log("Form is invalid");
    }
  }

  // Helper method to mark all form fields as touched
  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Method to reset form
  resetForm(): void {
    this.registerForm.reset();
    this.registerForm.patchValue({ role: '' });
  }
}
