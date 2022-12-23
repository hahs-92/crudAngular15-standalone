import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Observable } from 'rxjs';

import { PlayersService } from '../../../services/players.service';
import { Player } from '../../../shared/models/player.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  playerService: PlayersService = inject(PlayersService);
  _router = inject(Router);

  playerForm = new FormControl('');
  players$!: Observable<Player[]>;

  ngOnInit() {
    this.players$ = this.playerService.getPlayers();

    this.playerForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((search) => {
        if (search) {
          this.players$ = this.playerService.getPlayers(search);
        } else {
          this.players$ = this.playerService.getPlayers(search!);
        }
      });
  }

  editPlayer(player: Player) {
    this._router.navigateByUrl('users/edit', { state: { player } });
  }

  deletePlayer(player: Player) {
    if (confirm(`Seguro de eliminar a ${player.name}`)) {
      this.playerService.deletePlayer(player.id);
    }
  }
}
