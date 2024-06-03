import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit breedSelected event when clicked', () => {
    const breedName = 'Test Breed';
    let emittedBreedName: string | undefined;

    component.breedSelected.subscribe((name) => {
      emittedBreedName = name;
    });

    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();

    expect(emittedBreedName).toEqual(component.name);
  });
});
