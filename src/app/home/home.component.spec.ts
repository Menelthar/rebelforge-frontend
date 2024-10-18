// src/app/home/home.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ArtistService } from '../artist-management/services/artist.service';
import { PortfolioService } from '../content-management/portfolios/services/portfolio.service';
import { AvailabilityService } from '../appointments/services/availability.service';
import { of, throwError } from 'rxjs';
import { SwiperModule } from 'swiper/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockArtistService: jasmine.SpyObj<ArtistService>;
  let mockPortfolioService: jasmine.SpyObj<PortfolioService>;
  let mockAvailabilityService: jasmine.SpyObj<AvailabilityService>;

  beforeEach(async () => {
    mockArtistService = jasmine.createSpyObj('ArtistService', ['getAllArtists', 'getAvailabilities']);
    mockPortfolioService = jasmine.createSpyObj('PortfolioService', ['getPortfolios']);

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ SwiperModule, FormsModule, ReactiveFormsModule ],
      providers: [
        { provide: ArtistService, useValue: mockArtistService },
        { provide: PortfolioService, useValue: mockPortfolioService },
        { provide: AvailabilityService, useValue: mockAvailabilityService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // Arrange
    mockArtistService.getAllArtists.and.returnValue(of([]));
    mockPortfolioService.getPortfolios.and.returnValue(of([]));
    mockAvailabilityService.getAvailabilities.and.returnValue(of([]));

    // Act
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();
  });

  it('should load artists on init', () => {
    // Arrange
    const mockArtists = [
      { id: 1, name: 'Artista 1', style: 'Estilo 1' },
      { id: 2, name: 'Artista 2', style: 'Estilo 2' }
    ];
    mockArtistService.getAllArtists.and.returnValue(of(mockArtists));
    mockPortfolioService.getPortfolios.and.returnValue(of([]));
    mockAvailabilityService.getAvailabilities.and.returnValue(of([]));

    // Act
    fixture.detectChanges();

    // Assert
    expect(component.artists).toEqual(mockArtists);
    expect(mockArtistService.getAllArtists).toHaveBeenCalledTimes(1);
  });

  it('should handle error when loading artists', () => {
    // Arrange
    mockArtistService.getAllArtists.and.returnValue(throwError('Error'));
    mockPortfolioService.getPortfolios.and.returnValue(of([]));
    mockAvailabilityService.getAvailabilities.and.returnValue(of([]));
    spyOn(console, 'error');

    // Act
    fixture.detectChanges();

    // Assert
    expect(component.artists).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Error al cargar los artistas:', 'Error');
  });

  it('should load availabilities on init', () => {
    // Arrange
    const mockAvailabilities = [
      { artistName: 'Artista 1', date: '2024-10-10' },
      { artistName: 'Artista 2', date: '2024-10-12' }
    ];
    mockArtistService.getAllArtists.and.returnValue(of([]));
    mockPortfolioService.getPortfolios.and.returnValue(of([]));
    mockAvailabilityService.getAvailabilities.and.returnValue(of(mockAvailabilities));

    // Act
    fixture.detectChanges();

    // Assert
    expect(component.availabilities).toEqual(mockAvailabilities);
    expect(mockAvailabilityService.getAvailabilities).toHaveBeenCalledTimes(1);
  });

  it('should handle error when loading availabilities', () => {
    // Arrange
    mockArtistService.getAllArtists.and.returnValue(of([]));
    mockPortfolioService.getPortfolios.and.returnValue(of([]));
    mockAvailabilityService.getAvailabilities.and.returnValue(throwError('Error'));
    spyOn(console, 'error');

    // Act
    fixture.detectChanges();

    // Assert
    expect(component.availabilities).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Error al cargar las disponibilidades:', 'Error');
  });

  it('should display artists in the template', () => {
    // Arrange
    const mockArtists = [
      { id: 1, name: 'Artista 1', style: 'Estilo 1' },
      { id: 2, name: 'Artista 2', style: 'Estilo 2' }
    ];
    mockArtistService.getAllArtists.and.returnValue(of(mockArtists));
    mockPortfolioService.getPortfolios.and.returnValue(of([]));
    mockAvailabilityService.getAvailabilities.and.returnValue(of([]));

    // Act
    fixture.detectChanges();
    const artistElements = fixture.debugElement.queryAll(By.css('.artist-card'));

    // Assert
    expect(artistElements.length).toBe(2);
    expect(artistElements[0].nativeElement.textContent).toContain('Artista 1');
    expect(artistElements[1].nativeElement.textContent).toContain('Artista 2');
  });

  it('should display availabilities in the template', () => {
    // Arrange
    const mockAvailabilities = [
      { artistName: 'Artista 1', date: '2024-10-10' },
      { artistName: 'Artista 2', date: '2024-10-12' }
    ];
    mockArtistService.getAllArtists.and.returnValue(of([]));
    mockPortfolioService.getPortfolios.and.returnValue(of([]));
    mockAvailabilityService.getAvailabilities.and.returnValue(of(mockAvailabilities));

    // Act
    fixture.detectChanges();
    const availabilityElements = fixture.debugElement.queryAll(By.css('.availability-card'));

    // Assert
    expect(availabilityElements.length).toBe(2);
    expect(availabilityElements[0].nativeElement.textContent).toContain('Artista: Artista 1');
    expect(availabilityElements[1].nativeElement.textContent).toContain('Artista: Artista 2');
  });

  // Agrega más pruebas según sea necesario, como la interacción con el formulario de búsqueda
});
