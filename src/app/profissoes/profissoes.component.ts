import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ProfissoesService } from './profissoes.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profissoes',
  templateUrl: './profissoes.component.html',
  styleUrls: ['./profissoes.component.css']
})

export class ProfissoesComponent implements OnInit, OnDestroy {
  private id: number;
  private hasSuc: any;
  private loading: boolean = false;
  private subscribeJobs: Subscription;
  displayedColumns = ['nome', 'id'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service:ProfissoesService, private router:Router) {}

  ngOnInit() {
    this.getAll();
  }

  ngOnDestroy() {
    this.subscribeJobs.unsubscribe();
  }

  private getAll() {
    this.loading = true;
    this.subscribeJobs = this.service.all().subscribe(suc => {
      this.loading = false;
      this.hasSuc = suc;
      this.dataSource = new MatTableDataSource<any>(suc);
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.loading = false;
    });
  }

  delete(id){
    this.loading = true;
    this.subscribeJobs = this.service.delete(id).subscribe(() => {
      this.loading = false;
      this.getAll();
    });
  }

  edit(id:number) {
    this.router.navigate(['/editar-profissao', id]);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}

export interface PeriodicElement {
  nome: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nome: ''},
];
