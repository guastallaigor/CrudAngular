import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PessoasService } from './pessoas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})

export class PessoasComponent implements OnInit, OnDestroy {
  private id: number;
  private hasSuc: any;
  private loading: boolean = false;
  private subscribePerson: Subscription;

  displayedColumns = ['nome', 'sobrenome', 'email', 'profissao', 'formacao', 'id'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service:PessoasService, private router:Router) {}

  private getAll() {
    this.loading = true;
    this.subscribePerson = this.service.all().subscribe(suc => {
      this.hasSuc = suc;
      this.loading = false;
      this.dataSource = new MatTableDataSource<any>(suc);
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.loading = false;
    });
  }

  ngOnInit() {
    this.getAll();
  }

  ngOnDestroy() {
    this.subscribePerson.unsubscribe();
  }

  delete(id){
    this.subscribePerson = this.service.delete(id).subscribe(() => {
      this.getAll();
    });
  }

  edit(id:number) {
    this.router.navigate(['/editar-pessoa', id]);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}

export interface PeriodicElement {
  nome: string;
  sobrenome: string;
  email: string;
  sexo: string;
  formacao: string;
  profissao: string;
  estado: string;
  cidade: string;
  id: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nome: '', sobrenome: '', email: '', sexo: '',  profissao: '', formacao: '', estado: '', cidade: '', id: ''},
];
