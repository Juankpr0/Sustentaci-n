import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./Estructura/header/header.component";
import { FooterComponent } from './Estructura/footer/footer.component';
import { HomeComponent } from "./P\u00E1ginas/home/home.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Trinity';
}

