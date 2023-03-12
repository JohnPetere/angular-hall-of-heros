import { Injectable } from '@angular/core';
import { Hero } from './app/heros';
import { HEROES } from './app/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './app/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService, private http: HttpClient) { }
  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES);
  //   this.messageService.add('HeroService: fetched heroes');
  //   return heroes;
  // }
  // Getting from a server
  /** GET heroes from the server */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
getHeroes(): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
  .pipe(
    catchError(this.handleError<Hero[]>('getHeroes', []))
  );
// }
//   getHero(id: number): Observable<Hero> {
//     // For now, assume that a hero with the specified `id` always exists.
//     // Error handling will be added in the next step of the tutorial.
//     const hero = HEROES.find(h => h.id === id)!;
//     this.messageService.add(`HeroService: fetched hero id=${id}`);
//     return of(hero);
  }

 getHero(id:number) : Observable<Hero>{
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
 }
 updateHero(hero: Hero): Observable<any>{
  return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
    tap(_=> this.log('updated hero id=${hero.id}')),
    catchError(this.handleError<any>('updateHero'))
  )
 }
 addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log('added hero w/ id=${newHero.id}')),
  catchError(this.handleError<Hero>('addHero'))
  )
 }/** DELETE: delete the hero from the server */
deleteHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}
  /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}
private heroesUrl = 'api/heroes';  // URL to web api
}
