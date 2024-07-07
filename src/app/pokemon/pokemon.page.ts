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

  async loadPokemon() {
    const hayPokemon =
      this.dbService.dbReady().value &&
      (await this.dbService.hayPokemonGuardados());

    if (hayPokemon) {
      console.log('Cargando Pokémon desde la base de datos...');
      const pokemonDB = this.dbService.dbReady().value
        ? await this.dbService.buscarPokemon(this.offset, this.limit)
        : [];

      if (pokemonDB.length < this.limit) {
        const nuevosPokemons = this.dbService.dbReady().value
          ? await this.cargarPokemonsDesdeAPI()
          : [];
        this.pokemon = [...pokemonDB, ...nuevosPokemons];
      } else {
        this.pokemon = pokemonDB;
      }
    } else {
      console.log('Cargando Pokémon desde la API...');
      this.pokemon = await this.cargarPokemonsDesdeAPI();
    }
  }

  private async cargarPokemonsDesdeAPI(): Promise<Pokemon[]> {
    return new Promise<Pokemon[]>((resolve, reject) => {
      this.http
        .get<any>(
          `https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`
        )
        .subscribe(
          async (response) => {
            const nuevosPokemons = response.results.map(
              (poke: any, index: number) => ({
                id: this.offset + index + 1,
                name: poke.name,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  this.offset + index + 1
                }.png`,
                url: poke.url,
              })
            );

            for (let poke of nuevosPokemons) {
              this.dbService.dbReady().value &&
                (await this.dbService.insertarPokemon(
                  poke.id,
                  poke.name,
                  poke.imageUrl,
                  poke.url
                ));
            }
            this.dbService.presentToast('Pokémon guardados con éxito');
            resolve(nuevosPokemons);
          },
          (error) => {
            console.error('Error fetching Pokemon:', error);
            reject(error);
          }
        );
    });
  }

  toDoNavegacion() {
    this.router.navigate(['home']);
  }

  logout() {
    this.dbService.logout();
  }
}
