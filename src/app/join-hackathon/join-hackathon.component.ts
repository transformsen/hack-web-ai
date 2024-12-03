import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AI, Session } from '../ai.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-join-hackathon',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule, 
    OverlayModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './join-hackathon.component.html',
  styleUrl: './join-hackathon.component.scss'
})
export class JoinHackathonComponent {
  joinHackathonForm: FormGroup;

  countries = ['USA', 'India', 'UK', 'Canada', 'Germany']; // Dropdown options

  constructor(private fb: FormBuilder) {
    this.joinHackathonForm = this.fb.group({
      teamName: ['', [Validators.required]],
      technologyStack: ['', [Validators.required]],
      skill: ['', [Validators.required]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', [Validators.required]],
      country: ['', [Validators.required]],
      description: [''],
    });
  }

  isOpen = false;
  question = '';
  isLoading = false;
  answer = '';

  openDialog(): void {
    this.isOpen = true;
  }

  async onSend() {
   this.isLoading = true
   const self:any = window;
   const ai: AI = self.ai;
   const session: Session = await ai.languageModel.create({
     systemPrompt: 'You are a helpful assistant for creating json. **json_format** and *prompt* are give. based on the **prompt** creat json and provide the created output as json.'
   });

   const stream = await session.prompt(
     'Prompt=' +  this.question + ', Context=' + JSON.stringify(this.joinHackathonForm.value));

    const json = this.getjson(stream);
    this.isLoading = false;
    this.joinHackathonForm.patchValue(json);    
    this.isOpen = false;
  }

  getjson(input:string) {
    const regex = /```json\s*(.*?)\s*```/s;
    const match = input.match(regex);

    if (match) {
      const jsonValue = match[1];
      try {
        return JSON.parse(jsonValue);        
      } catch (error) {
        console.error('Invalid JSON:', error);
      }
    } else {
      console.log('No JSON value found');
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.isOpen = false;
    }
  }


  onSubmit() {
    if (this.joinHackathonForm.valid) {
      console.log('Form Submitted:', this.joinHackathonForm.value);
      alert('Successfully submitted!');
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
