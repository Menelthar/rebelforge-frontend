import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar componentes que no se cargan de forma diferida
import { ContactComponent } from './contact/contact/contact.component';
import { BlogComponent } from './content-management/blog/blog/blog.component';
import { NewsComponent } from './content-management/news/news/news.component';
import { PortfoliosComponent } from './content-management/portfolios/portfolios/portfolios.component';
import { FaqComponent } from './faq/faq/faq.component';
import { SearchComponent } from './search/search/search.component';
import { HomeComponent } from './home/home.component'; // Importa el HomeComponent
import { LoginComponent } from './feature-module/authentication/login/login/login.component'; // Importa el componente de Login
import { RegisterComponent } from './feature-module/authentication/register/register/register.component'; // Importa el componente de Registro

const routes: Routes = [
  // Lazy loading para mejorar el rendimiento
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'artist-management',
    loadChildren: () => import('./artist-management/artist-management.module').then(m => m.ArtistManagementModule)
  },
  {
    path: 'studio-management',
    loadChildren: () => import('./studio-management/studio-management.module').then(m => m.StudioManagementModule)
  },
  {
    path: 'content-management',
    loadChildren: () => import('./content-management/content-management.module').then(m => m.ContentManagementModule)
  },
  {
    path: 'appointments',
    loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule)
  },

  // Componentes que no requieren autenticación
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'search', component: SearchComponent },
  { path: 'home', component: HomeComponent }, // Ruta para Home
  { path: 'login', component: LoginComponent }, // Ruta para Login
  { path: 'register', component: RegisterComponent }, // Ruta para Registro

  // Redirección por defecto y rutas no encontradas
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Ruta por defecto redirige a Home
  { path: '**', redirectTo: '/home' }, // Ruta para manejar rutas no existentes redirige a Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
