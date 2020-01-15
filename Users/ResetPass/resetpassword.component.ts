import { Component, OnInit } from '@angular/core';
import {UserService} from '../users.service';
import * as toastr from 'toastr';
import {Router} from '@angular/router';



@Component({
  selector: 'app-reset',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})

export class ResetPassword implements OnInit {

  email:''
  password:''
  confirmpassword:''

  constructor(
    private userService: UserService,
         private router: Router
  ) { }

  ngOnInit() { }

  onSet(){

    if(this.email.length == 0){
      toastr.error("Please Enter Valid Username")
    }else if(this.password.length == 0){
        toastr.error('Plese Enter valid email ')
      }else if(this.confirmpassword.length == 0){
        toastr.error('Plese Enter valid email ')
      }else {
        this.userService.resetpassUser(this.email,this.password)
        .subscribe(response=>{
          if(response['status']=='success'){
            toastr.success('Admin Registered successfully!!')
            this.router.navigate['/login-page']
          } else{
            toastr.error(response['error'])
          }
        })

      }
  }
}
