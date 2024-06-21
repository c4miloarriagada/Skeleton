import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbService } from '../services/db.service';
import { Router } from '@angular/router';
interface Pokemon {
  name: string;
  url: string;
  id: number;
  imageUrl: string;
}

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {
  pokemon: Pokemon[] = [];
  offset: number = 0;
  limit: number = 20;
  constructor(
    private http: HttpClient,
    private dbService: DbService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPokemon();
  }

  nextPage() {
    this.offset += this.limit;
    this.loadPokemon();
  }

  previousPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadPokemon();
    }
  }
  loadPokemon() {
    this.http
      .get<any>(
        `https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`
      )
      .subscribe(
        (response) => {
          this.pokemon = response.results.map((poke: any, index: number) => ({
            ...poke,
            id: this.offset + index + 1,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              this.offset + index + 1
            }.png`,
          }));
        },
        (error) => {
          console.error('Error fetching Pokemon:', error);
        }
      );
  }
  toDoNavegacion() {
    this.router.navigate(['home']);
  }

  logout() {
    this.dbService.logout();
  }
}
