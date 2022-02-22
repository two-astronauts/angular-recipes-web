import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public recipe: any;
  public id: Number;
  public mode: String;
  public recipeForm: FormGroup;
  private copyRecipe: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {
    this.recipe = {};
    this.id = 0;
    this.mode = 'view';
    this.recipeForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      detail: new FormControl('', Validators.required)
    });
    this.copyRecipe = {};
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.params.subscribe(params => {
       this.id = params['id'];
       this.loadRecipe();
      })
    );
  }

  public loadRecipe(): void {
    this.subscriptions.add(
      this.recipeService.getRecipe(this.id).subscribe(recipe => {
        this.copyRecipe = recipe;
        this.setValues(this.copyRecipe);
      })
    );
  }

  private setValues(recipe: any): void {
    this.recipe = recipe;
    this.recipeForm.patchValue(recipe);
  }

  public add(): void {
    this.mode = 'add';
    this.recipe = {};
    this.recipeForm.reset();
  }

  public edit(): void {
    this.mode = 'edit';
  }

  public cancel(): void {
    this.mode = 'view';
    this.setValues(this.copyRecipe);
  }

  public saveUpdate(): void {
    let recipe = this.recipeForm.getRawValue();
    recipe.detail = this.recipe.detail;
    if (this.mode === 'add') {
      this.save(recipe);
    } else {
      this.update(recipe);
    }
  }

  private save(recipe: any): void {
    this.subscriptions.add(
      this.recipeService.saveRecipe(recipe).subscribe(recipe => {
        this.mode = 'view';
        this.router.navigate(['detail', recipe.id]);
      })
    );
  }

  private update(recipe: any): void {
    this.subscriptions.add(
      this.recipeService.updateRecipe(this.id, recipe).subscribe(recipe => {
        this.mode = 'view';
        this.loadRecipe();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
