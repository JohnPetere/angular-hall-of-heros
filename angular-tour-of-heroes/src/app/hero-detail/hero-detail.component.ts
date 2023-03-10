import { Component, Input } from '@angular/core';
import { Hero } from '../heros'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from 'src/hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  @Input() hero?: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.heroService.getHero(id)
    .subscribe(heroes => this.hero = heroes);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if(this.hero){
      this.heroService.updateHero(this.hero)
      // Why is the empty funciton call () put inside the subscribe functions???
      .subscribe(()=> this.goBack());
    }
  }


}