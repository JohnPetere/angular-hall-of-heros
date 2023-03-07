import { Component } from '@angular/core';
import {Hero} from '../heros'
import { HEROES } from '../mock-heroes';
import { HeroService } from 'src/hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  constructor(private heroService: HeroService) {}
  heroes: Hero[] = [];
  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes)
  }
  ngOnInit(): void {
    this.getHeroes();
  }
}
