import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  constructor(private loginService: AuthenticationService) { }

  ngOnInit() {
  //   $(document).ready(function(){
  //     $("button").click(function(){
  //         $("button").css('color', 'blue');
  //     });
  // });

  var div = document.querySelector('.calender').

  div.classList.add('css');

  }

}
