import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }


  //Check and set the username to session
  authenticate(username, password){
    if(username == 'user1' && password == 'user1'){
      sessionStorage.setItem('username', username);
      return true;
    }else{
      return false;
    }
  }

  //If user is there or not
  isUserLoggedIn(){
    let user = sessionStorage.getItem('username');
    return !(user === null); //returns true if user is there
  }

  //Remove user from session
  logout(){
    sessionStorage.removeItem('username');
  }

}
