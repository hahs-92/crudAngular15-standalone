import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

import { PlayersService } from '../../../services/players.service';
import { Player } from '../../../shared/models/player.model';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Observable } from 'rxjs';
import { Router } from '@angular/router';

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
    this._router.navigateByUrl('users/edit');
  }

  deletePlayer(player: Player) {
    if (confirm(`Seguro de eliminar a ${player.name}`)) {
      this.playerService.deletePlayer(player.id);
    }
  }
}
