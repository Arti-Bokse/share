import { Component, OnInit } from '@angular/core';
import {UserService} from '../users.service';
import * as toastr from 'toastr';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-user',
  templateUrl: 'update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateUserComponent implements OnInit {

  name:''
  email:''
  phone:''
  password:''
  role:''

  constructor() {
  }
  ngOnInit() { }


}
