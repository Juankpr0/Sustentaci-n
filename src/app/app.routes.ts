import { Routes, provideRouter } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './Páginas/home/home.component';
import { RegistrosComponent } from './Páginas/registros/registros.component';
import { StockComponent } from './Páginas/stock/stock.component';
import { UsersComponent } from './Páginas/users/users.component';
import { NoFoundComponent } from './Páginas/no-found/no-found.component';
import { AlertasComponent } from './Páginas/alertas/alertas.component';
import { DetallesComponent } from './Páginas/alertas/detalles/detalles.component';
import { OtrosComponent } from './Páginas/otros/otros.component';
import { ProductsComponent } from './Páginas/products/products.component';
import { DashboardComponent } from './Páginas/dashboard/dashboard.component';
import { LoginComponent } from './Páginas/login/login.component';
import { RegistroComponent } from './Páginas/registro/registro.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [] },
    { path: 'categories', component: HomeComponent, canActivate: [] },
    { path: 'stock', component: StockComponent, canActivate: [] },
    { path: 'registros', component: RegistrosComponent, canActivate: [] },
    { path: 'users', component: UsersComponent, canActivate: [] },
    { path: 'alertas', component: AlertasComponent, canActivate: [] },
    { path: 'detalles', component: DetallesComponent, canActivate: [] },
    { path: 'otros', component: OtrosComponent, canActivate: [] },
    { path: 'productos', component: ProductsComponent, canActivate: [] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [] },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: '**', component: NoFoundComponent }
];

export const AppRoutingModule = provideRouter(routes);