import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//models
import { User } from '../../model/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-hackrank',
  templateUrl: './hackrank.component.html',
  styleUrls: ['./hackrank.component.css']
})
export class HackrankComponent implements OnInit {

  public status: String;
  public errorMessage;
  public users: Array<any>;
  public numMayor: number;
  constructor(
    private userService: UsersService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users = [{
      id: 1,
      name: 'Gerlis Alvarez',
      username: 'galvarez',
      email: 'galvarez@gmail.com',
      lenguaje: 'Java',
      puntaje: Math.round((Math.random() * (100 - 10)) + 10)
    },
    {
      id: 2,
      name: 'Camilo mamian',
      username: 'cmamian',
      email: 'cmamian@gmail.com',
      lenguaje: 'Java',
      puntaje: Math.round((Math.random() * (100 - 10)) + 10)
    },
    {
      id: 3,
      name: 'Jonathan soto',
      username: 'jsotoo',
      email: 'jsotoo@gmail.com',
      lenguaje: '.Net',
      puntaje: Math.round((Math.random() * (100 - 10)) + 10)
    },
    {
      id: 4,
      name: 'Carlos Perez',
      username: 'cperez',
      email: 'cperez@gmail.com',
      lenguaje: '.Net',
      puntaje: Math.round((Math.random() * (100 - 10)) + 10)
    },
    {
      id: 5,
      name: 'Edinson Peroza',
      username: 'eperoza',
      email: 'eperoza@gmail.com',
      lenguaje: 'Java',
      puntaje: Math.round((Math.random() * (100 - 10)) + 10)
    },
    {
      id: 6,
      name: 'José Salgado',
      username: 'jsalgado',
      email: 'jsalgado@gmail.com',
      lenguaje: '.Net',
      puntaje: Math.round((Math.random() * (100 - 10)) + 10)
    },
    {
      id: 7,
      name: 'Milton torres',
      username: 'mtorres',
      email: 'mtorres@gmail.com',
      lenguaje: '.Net',
      puntaje: Math.round((Math.random() * (100 - 10)) + 10)
    }];

    this.users.sort(function (a, b): number {
      return b.puntaje - a.puntaje;
    });

  }
}
