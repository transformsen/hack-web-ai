import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinHackathonComponent } from './join-hackathon.component';

describe('JoinHackathonComponent', () => {
  let component: JoinHackathonComponent;
  let fixture: ComponentFixture<JoinHackathonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinHackathonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinHackathonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
