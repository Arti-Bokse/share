import { Component, OnInit } from '@angular/core';
import {UserService} from '../users.service';
import * as toastr from 'toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  name:''
  email:''
  phone:''
  password:''
  role:''


  constructor(private userService: UserService,
         private router: Router ) { }

  ngOnInit() { }

  onRegister(){
    if(this.name.length == 0){
      toastr.error("Please Enter Valid Username")
    }else if(this.email.length == 0){
        toastr.error('Plese Enter valid email ')
      }else if(this.password.length == 0){
        toastr.error('Plese Enter valid email ')
      }else {
        this.userService.registerUser(this.name,this.email,this.phone,this.password,this.role)
        .subscribe(response=>{
          if(response['status']=='success'){
            toastr.alertsuccess('Admin Registered successfully!!')
            this.router.navigate['/login-page']
          } else{
            toastr.error(response['error'])
          }
        })
      }
    }

  }


