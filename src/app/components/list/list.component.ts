import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public recipes: any[];

  constructor(private recipeService: RecipeService) {
    this.recipes = [];
  }

  ngOnInit(): void {
    this.loadRecipes();
  }

  public loadRecipes(): void {
    this.subscriptions.add(
      this.recipeService.getRecipes().subscribe(recipes => {
        this.recipes = recipes;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
