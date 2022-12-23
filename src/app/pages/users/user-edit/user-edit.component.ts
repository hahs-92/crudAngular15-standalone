import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

import { PlayersService } from '../../../services/players.service';
import { Player, Deck } from '../../../shared/models/player.model';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
  _playerService = inject(PlayersService);
  _router = inject(Router);
  _location = inject(Location); // obtene rel estado de una ruta
  player!: Player;

  playerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    decks: new FormArray([]),
  });

  get decks() {
    return (this.playerForm.get('decks') as FormArray).controls;
  }

  ngOnInit() {
    this.player = (this._location.getState() as any).player;

    if (this.player) {
      console.log(this.player);
      this.setCurrentPlayer(this.player);
    }
  }

  setCurrentPlayer(player: any) {
    this.playerForm.patchValue(this.player as any);

    player.decks.map((deck: Deck) => {
      const deckForm = new FormGroup({
        name: new FormControl(deck.name),
        cards: new FormControl(deck ? deck.cards : null),
      });

      (this.playerForm.get('decks') as FormArray).push(deckForm);
    });
  }

  updatePlayer() {
    this._playerService.updatePlayer({
      id: this.player.id,
      ...this.playerForm.getRawValue(),
    } as Player);

    this._router.navigate(['users']);
  }
}
