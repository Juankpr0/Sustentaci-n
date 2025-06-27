import { Component } from '@angular/core';
import { HeaderComponent } from "./Estructura/header/header.component";
import { FooterComponent } from './Estructura/footer/footer.component';
import { HttpClientXsrfModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Trinity';
}