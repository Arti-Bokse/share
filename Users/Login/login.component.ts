import { Component, OnInit } from '@angular/core';
import {UserService} from '../users.service';
import * as toastr from 'toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit {

 email = ''
 password = ''

  constructor(private userService: UserService,
              private router: Router) {  }

  ngOnInit() { }

  onLogin(){
      if (this.email.length == 0 ){
        toastr.error('Enter Valid Email')
      }
      else if(this.password.length == 0){
        toastr.error('Enter valid Password')
      }
      else{
        this.userService
        .loginuser(this.email,this.password)
        .subscribe(response=>{
          if(response['status']=='success'){
           toastr.success('Welcome!!')
           sessionStorage['login_status']='1'
           this.router.navigate(['/registrtion-page'])
          }
          else{
            toastr.error(response['error'])
        }
        })
      }
  }


}
