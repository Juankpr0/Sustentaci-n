import { Routes, RouterOutlet} from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './Páginas/home/home.component';
import { RegistrosComponent } from './Páginas/registros/registros.component';
import { StockComponent } from './Páginas/stock/stock.component';
import { UsersComponent } from './Páginas/users/users.component';
import { NoFoundComponent } from './Páginas/no-found/no-found.component';
import { AlertasComponent } from './Páginas/alertas/alertas.component';
import { DetallesComponent } from './Páginas/alertas/detalles/detalles.component';
import { OtrosComponent } from './Páginas/otros/otros.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'stock', component: StockComponent},
    {path: 'registros', component: RegistrosComponent},
    {path: 'users', component: UsersComponent},
    {path: 'alertas', component: AlertasComponent},
    {path: 'detalles', component: DetallesComponent},
    {path: 'otros', component: OtrosComponent},
    {path: '**', component: NoFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}