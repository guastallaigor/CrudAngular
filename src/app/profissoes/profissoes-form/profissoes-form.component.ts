import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfissoesService } from '../profissoes.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profissoes-form',
  templateUrl: './profissoes-form.component.html',
  styleUrls: ['./profissoes-form.component.css']
})
export class ProfissoesFormComponent implements OnInit, OnDestroy {
  private id: number;
  private subscribeParams: Subscription;
  private subscribeJobs: Subscription;

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private profissoesService: ProfissoesService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.subscribeParams = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });

    if (this.id) {
      this.subscribeJobs = this.profissoesService.getById(this.id).subscribe(suc => {
        this.myForm.setValue(suc);
      });
    }
  }

  ngOnDestroy() {
    this.checkIfExistsToUnsub();
  }

  checkIfExistsToUnsub() {
    if (this.subscribeParams) {
      this.subscribeParams.unsubscribe();
    }

    if (this.subscribeJobs) {
      this.subscribeJobs.unsubscribe();
    }
  }

  createForm() {
    this.myForm = this.fb.group({
      id: '',
      nome: ['', Validators.required],
    });
  }

  save() {
    if (!this.myForm.valid) {
      return;
    }

    if (this.id) {
      this.subscribeJobs = this.profissoesService.edit(this.myForm.value).subscribe(() => {
        this.router.navigate(['/profissoes']);
      });

      return;
    }

    this.subscribeJobs = this.profissoesService.add(this.myForm.value).subscribe(() => {
      this.myForm.reset();
      this.router.navigate(['/profissoes']);
    });
  }
}
