import { Component, OnInit, OnDestroy } from '@angular/core';
import { EffectifTotal } from '../model/EffectifTotal';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { EffectifTotalService } from '../service/EffectifTotalService';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-eff',
  templateUrl: './effectife.html',
  styleUrls: ['./effectife.css']
})
export class effectife  implements OnInit {
  effectifTotalForm: FormGroup;
  effectifTotals: EffectifTotal[] = [];
  currentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private effectifTotalService: EffectifTotalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.effectifTotalForm = this.fb.group({
      effectiveTotal: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.currentId = +this.route.snapshot.paramMap.get('id')!;
    if (this.currentId) {
      this.loadEffectifTotal();
    } else {
      this.loadAllEffectifTotals();
    }
  }

  loadEffectifTotal(): void {
    if (this.currentId !== null) {
      this.effectifTotalService.getEffectifTotalById(this.currentId).subscribe(effectifTotal => {
        this.effectifTotalForm.patchValue(effectifTotal);
      });
    }
  }

  loadAllEffectifTotals(): void {
    this.effectifTotalService.getAllEffectifTotals().subscribe(effectifTotals => {
      this.effectifTotals = effectifTotals;
    });
  }

  createEffectifTotal(): void {
    if (this.effectifTotalForm.valid) {
      const effectifTotal: EffectifTotal = this.effectifTotalForm.value;
      this.effectifTotalService.createEffectifTotal(effectifTotal).subscribe(() => {
        alert('EffectifTotal created successfully!');
        this.router.navigate(['/effectifTotal-list']);
      });
    }
  }

  updateEffectifTotal(): void {
    if (this.currentId !== null && this.effectifTotalForm.valid) {
      const effectifTotal: EffectifTotal = this.effectifTotalForm.value;
      this.effectifTotalService.updateEffectifTotal(this.currentId, effectifTotal).subscribe(() => {
        alert('EffectifTotal updated successfully!');
        this.router.navigate(['/effectifTotal-list']);
      });
    }
  }

  deleteEffectifTotal(id: number): void {
    this.effectifTotalService.deleteEffectifTotal(id).subscribe(() => {
      alert('EffectifTotal deleted successfully!');
      this.loadAllEffectifTotals();
    });
  }
}