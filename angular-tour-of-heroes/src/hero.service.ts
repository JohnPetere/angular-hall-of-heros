import { Injectable } from '@angular/core';
import { Hero } from './app/heros';
import { HEROES } from './app/mock-heroes';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }
  getHeroes(): Hero[]{
    return HEROES
  }
}
