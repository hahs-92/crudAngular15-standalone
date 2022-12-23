import { Injectable } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  query,
  collectionData,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { where } from '@firebase/firestore';

import { Player } from '../shared/models/player.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  PLAYER_COLLECTION = 'players';

  constructor(private firestore: Firestore) {}

  getPlayers(filter = '') {
    const playerRef = collection(this.firestore, this.PLAYER_COLLECTION);
    let q = query(playerRef);

    if (filter) {
      q = query(playerRef, where('name', '==', filter));
    }

    return collectionData(q) as unknown as Observable<Player[]>;
  }

  addPlayer(player: Player) {
    const playerRef = collection(this.firestore, this.PLAYER_COLLECTION);
    return addDoc(playerRef, player);
  }

  async updatePlayer(player: Player) {
    const playerRef = collection(this.firestore, this.PLAYER_COLLECTION);
    let q = query(playerRef, where('id', '==', player.id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, this.PLAYER_COLLECTION, document.id);
      await updateDoc(docRef, { ...player });
    });
  }

  async deletePlayer(playerId: string) {
    const playerRef = collection(this.firestore, this.PLAYER_COLLECTION);
    let q = query(playerRef, where('id', '==', playerId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, this.PLAYER_COLLECTION, document.id);
      await deleteDoc(docRef);
    });
  }
}
