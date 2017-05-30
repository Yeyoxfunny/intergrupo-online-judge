import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

//models
import { Users } from '../../model/users';

@Component({
  selector: 'app-hackrank',
  templateUrl: './hackrank.component.html',
  styleUrls: ['./hackrank.component.css']
})
export class HackrankComponent implements OnInit {

  public status: String;
  public errorMessage;
  public users: Users[];
  public numMayor: number;
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getAllUsers() {
    this._authService.getAllUsers().subscribe(
      result => {
        this.users = result.data;
        this.status = result.status;
        console.log(result.status);
        if (this.status != "success") {
          alert("Error en el servidor");
        }
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage !== null) {
          console.log(this.errorMessage);
          alert("Error");
        }
      });
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
