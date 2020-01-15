import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})

export class UserListComponent implements OnInit {
  users = []
  constructor(private userService: UserService) {
    userService.getUser().subscribe((response=>{
      if(response['status']=='success'){
          this.users = response['data']
      }
      else{
          console.log(response['data'])
      }
  })
  )


}

  ngOnInit() { }
}
