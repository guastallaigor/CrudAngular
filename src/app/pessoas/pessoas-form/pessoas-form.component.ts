import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PessoasService } from '../pessoas.service';
import { EnderecoService } from '../../endereco/endereco.service';
import { ProfissoesService } from '../../profissoes/profissoes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoas-form',
  templateUrl: './pessoas-form.component.html',
  styleUrls: ['./pessoas-form.component.css']
})
export class PessoasFormComponent implements OnInit, OnDestroy {
  private id: number;
  private estados: Array<any>;
  private profissoes: Array<any>;
  private cidades: Array<any>;

  private subscribeParams: Subscription;
  private subscribePerson: Subscription;
  private subscribeAddress: Subscription;
  private subscribeJobs: Subscription;
  private subscribeState: Subscription;

  myForm: FormGroup;

  sexos = [
    { id: 'MASCULINO', descricao: 'Masculino' },
    { id: 'FEMININO', descricao: 'Feminino' }
  ];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private pessoasService: PessoasService,
    private enderecoService: EnderecoService,
    private profissoesService: ProfissoesService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getJobs();
    this.getState();

    this.subscribeParams = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });

    if (this.id) {
      this.subscribePerson = this.pessoasService.getById(this.id).subscribe(suc => {
        this.myForm.setValue(suc);
      });
    }
  }

  ngOnDestroy() {
    this.subscribeParams.unsubscribe();
    this.subscribePerson.unsubscribe();
    this.subscribeJobs.unsubscribe();
    this.subscribeState.unsubscribe();
    this.subscribeAddress.unsubscribe();
  }

  createForm() {
    this.myForm = this.fb.group({
      id: '',
      nome: ['', Validators.required ],
      sobrenome: ['', Validators.required ],
      sexo: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      formacao: ['', Validators.required ],
      profissao: ['', Validators.required ],
    });
  }

  getState() {
    this.subscribeState = this.enderecoService.states().subscribe(suc => {
      this.estados = suc;
    });
  }

  getJobs() {
    this.subscribeJobs = this.profissoesService.all().subscribe(suc => {
      this.profissoes = suc;
    });
  }

  saveUser() {
    if (!this.myForm.valid) return;

    this.myForm.value.estado = this.myForm.value.estado.nome;
    this.myForm.value.cidade = this.myForm.value.cidade.nome;

    if (this.id) {
      this.subscribePerson = this.pessoasService.edit(this.myForm.value).subscribe(() => {
        this.router.navigate(['/pessoas']);
      });

      return;
    }

    this.subscribePerson = this.pessoasService.add(this.myForm.value).subscribe(() => {
      this.myForm.reset();
      this.router.navigate(['/pessoas']);
    });
  }

  selectState() {
    this.subscribeAddress = this.enderecoService.cities(this.myForm.value.estado.id).subscribe(suc => {
      this.cidades = suc;
    });
  }
}
