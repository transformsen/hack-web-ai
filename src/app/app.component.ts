import { Component } from '@angular/core';
import { JoinHackathonComponent } from './join-hackathon/join-hackathon.component';
import { HackathonsListComponent } from './hackathons-list/hackathons-list.component';

@Component({
  selector: 'app-root',
  imports: [JoinHackathonComponent, HackathonsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hack-web-ai';
}
