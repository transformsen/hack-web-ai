import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { AI, Session } from '../ai.model';
import * as marked from 'marked';


@Component({
  selector: 'app-hackathons-list',
  imports: [AgGridAngular, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, 
    OverlayModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './hackathons-list.component.html',
  styleUrl: './hackathons-list.component.scss'
})
export class HackathonsListComponent {

  columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Hackathon Name', sortable: true, filter: true },
    { field: 'date', headerName: 'Date', sortable: true, filter: true },
    { field: 'location', headerName: 'Location', sortable: true, filter: true },
    { field: 'technologies', headerName: 'Technologies', sortable: true },
    { field: 'participants', headerName: 'Participants', sortable: true },
    { field: 'prize', headerName: 'Prize', sortable: true },
    { field: 'registrationFee', headerName: 'Registration Fee', sortable: true },
    { field: 'status', headerName: 'Status', sortable: true },
  ];

  rowData = [
    {
      name: 'CodeSprint 2024',
      date: '2024-12-15',
      location: 'New York',
      technologies: 'JavaScript, Python',
      participants: 200,
      prize: '$10,000',
      registrationFee: 'Free',
      status: 'Open',
    },
    {
      name: 'AI Innovate',
      date: '2024-12-20',
      location: 'San Francisco',
      technologies: 'AI, ML, Data Science',
      participants: 150,
      prize: '$15,000',
      registrationFee: '$50',
      status: 'Closed',
    },
    {
      name: 'Hack the Future',
      date: '2024-12-30',
      location: 'Remote',
      technologies: 'Web, Blockchain',
      participants: 300,
      prize: '$20,000',
      registrationFee: '$20',
      status: 'Open',
    }
  ];

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
     systemPrompt: 'You are a helpful assistant for anserwing questions. provide the *Prompt* and *Context* as the json. Answer the prompt question only based on *Context*'
   });

   const stream = await session.promptStreaming(
     'Prompt=' +  this.question + ', Context=' + JSON.stringify(this.rowData));

    let result = '';
    let previousChunk = '';

    for await (const chunk of stream) {
      const newChunk = chunk.startsWith(previousChunk)
          ? chunk.slice(previousChunk.length) : chunk;
      console.log(newChunk);
      result += newChunk;      
      this.answer = marked.parse(result) as string;
      previousChunk = chunk;
    }
    
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.isOpen = false;
    }
  }

  

}
