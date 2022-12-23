// ng g c pages/userAdd --standalone

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

import { PlayersService } from '../../../services/players.service';
import { Player } from '../../../shared/models/player.model';
@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent {
  _playerService = inject(PlayersService);
  _router = inject(Router);

  playerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    decks: new FormArray([]),
  });

  get decks() {
    return (this.playerForm.get('decks') as FormArray).controls;
  }

  createDeck() {
    return (this.playerForm.get('decks') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        cards: new FormControl(null, Validators.required),
      })
    );
  }

  addPlayer() {
    const newPlayer: Player = {
      id: new Date().getTime().toString(),
      ...this.playerForm.getRawValue(),
    } as Player;
    this._playerService.addPlayer(newPlayer);
    this._router.navigate(['users']);
  }
}
