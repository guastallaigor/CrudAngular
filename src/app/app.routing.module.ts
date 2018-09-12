import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoasComponent } from './pessoas/pessoas.component';
import { PessoasFormComponent } from './pessoas/pessoas-form/pessoas-form.component';
import { ProfissoesComponent } from './profissoes/profissoes.component';
import { ProfissoesFormComponent } from './profissoes/profissoes-form/profissoes-form.component';

const appRoutes: Routes = [
  { path: 'pessoas', component: PessoasComponent },
  { path: 'criar-pessoa', component: PessoasFormComponent },
  { path: 'editar-pessoa/:id', component: PessoasFormComponent },
  { path: 'profissoes', component: ProfissoesComponent },
  { path: 'criar-profissao', component: ProfissoesFormComponent },
  { path: 'editar-profissao/:id', component: ProfissoesFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
