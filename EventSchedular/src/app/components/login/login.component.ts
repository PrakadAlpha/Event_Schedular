import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {


  username: string ;
  password: string;
  invalidLogin = false;

  constructor(private router: Router, private loginService: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin(){
    if(this.loginService.authenticate(this.username, this.password)){
      this.router.navigate(['']);
      this.invalidLogin = false;
    }else{
      this.invalidLogin = true;
    }
  }

}
