import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyItemComponent } from './spotify-item.component';

describe('SpotifyItemComponent', () => {
  let component: SpotifyItemComponent;
  let fixture: ComponentFixture<SpotifyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpotifyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
