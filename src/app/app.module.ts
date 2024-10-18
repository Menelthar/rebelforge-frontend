import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistService } from './artist-management/services/artist.service'; // Importar ArtistService
import { HomeModule } from './home/home.module'; // Importar HomeModule
import { AuthenticationModule } from './feature-module/authentication/authentication.module'; // Importar AuthenticationModule
import { LoginModule } from './feature-module/authentication/login/login.module';
import { RegisterModule } from './feature-module/authentication/register/register.module'; // Importar RegisterModule
import { SidebarComponent } from './shared/sidebar/sidebar/sidebar.component';
import { AuthInterceptor } from './shared/core/auth.interceptor'; // Importar AuthInterceptor
// Importar módulos externos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Importar los componentes (sin LoginComponent)
import { AppointmentListComponent } from './admin/appointment-list/appointment-list/appointment-list.component';
import { ReportsComponent } from './admin/reports/reports/reports.component';
import { UserListComponent } from './admin/user-management/user-list/user-list/user-list.component';
import { UserDetailComponent } from './admin/user-management/user-detail/user-detail/user-detail.component';
import { ArtistListComponent } from './artist-management/artist-list/artist-list/artist-list.component';
import { ArtistProfileComponent } from './artist-management/artist-profile/artist-profile/artist-profile.component';
import { StudioListComponent } from './studio-management/studio-list/studio-list/studio-list.component';
import { StudioDetailComponent } from './studio-management/studio-detail/studio-detail/studio-detail.component';
import { ContactComponent } from './contact/contact/contact.component';
import { BlogComponent } from './content-management/blog/blog/blog.component';
import { NewsComponent } from './content-management/news/news/news.component';
import { PortfoliosComponent } from './content-management/portfolios/portfolios/portfolios.component';
import { FaqComponent } from './faq/faq/faq.component';
import { SearchComponent } from './search/search/search.component';
import { UserSettingsComponent } from './settings/user-settings/user-settings/user-settings.component';
import { PaymentsComponent } from './payments/payments/payments.component';
import { ReviewsComponent } from './reviews/reviews/reviews.component';
import { HeaderComponent } from './shared/header/header/header.component';
import { FooterComponent } from './shared/footer/footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentListComponent,
    ReportsComponent,
    UserListComponent,
    UserDetailComponent,
    ArtistListComponent,
    ArtistProfileComponent,
    StudioListComponent,
    StudioDetailComponent,
    ContactComponent,
    BlogComponent,
    NewsComponent,
    PortfoliosComponent,
    FaqComponent,
    SearchComponent,
    UserSettingsComponent,
    PaymentsComponent,
    ReviewsComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, // Añadir ReactiveFormsModule aquí también
    HttpClientModule,
    HomeModule,
    FontAwesomeModule,
    AuthenticationModule,
    LoginModule,
    RegisterModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }) // Añadir RegisterModule aquí
  ],
  providers: [
    ArtistService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
