import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTooltipModule, MatProgressSpinnerModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatOptionModule, MatSelectModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';

import { PessoasComponent } from './pessoas/pessoas.component';
import { PessoasFormComponent } from './pessoas/pessoas-form/pessoas-form.component';
import { ProfissoesComponent } from './profissoes/profissoes.component';
import { ProfissoesFormComponent } from './profissoes/profissoes-form/profissoes-form.component';

import { PessoasService } from './pessoas/pessoas.service'
import { ProfissoesService } from './profissoes/profissoes.service'
import { EnderecoService } from './endereco/endereco.service';

import { AppRoutingModule } from './app.routing.module';
import { Core } from './services/core';
import { DisableControlDirective } from './disable-control.directive';

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    PessoasComponent,
    PessoasFormComponent,
    ProfissoesComponent,
    ProfissoesFormComponent,
    DisableControlDirective
  ],
  imports: [
    HttpClientModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule
  ],
  providers: [
    PessoasService,
    EnderecoService,
    ProfissoesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
