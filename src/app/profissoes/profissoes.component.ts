import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ProfissoesService } from './profissoes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profissoes',
  templateUrl: './profissoes.component.html',
  styleUrls: ['./profissoes.component.css']
})

export class ProfissoesComponent implements OnInit {
  private id: number;
  private hasSuc: any;
  private loading: boolean = false;
  displayedColumns = ['nome', 'id'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service:ProfissoesService, private router:Router) {}

  ngOnInit() {
    this.getAll();
  }

  private getAll() {
    this.loading = true;
    this.service.all().subscribe(suc => {
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
    return this.service.delete(id).subscribe(() => {
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
