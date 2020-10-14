import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BooksComponent } from './components/books/books.component';
import { CartComponent } from './components/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { RouterModule } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
registerLocaleData(localeFr);
@NgModule({
  declarations: [
    FilterPipe,
    AppComponent,
    NavbarComponent,
    BooksComponent,
    CartComponent,
    BookDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'cart', component: CartComponent },
      { path: 'books', component: BooksComponent },
      { path: 'book-detail/:id', component: BookDetailsComponent },
      { path: '',   redirectTo: '/books', pathMatch: 'full' }
    ])
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'fr-FR'
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
