import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot, Router } from '@angular/router';


@Injectable()
export class UserService implements CanActivate {



    url='http://localhost:4000/user'

    constructor(private http: HttpClient,private router:Router) { }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot)
    {
        //checking if admin is already logged in or not
        if(sessionStorage['login_status']=='1'){
           // if(localStorage['login_status']=='1'){
            return true
        }

        this.router.navigate(['/admin-login'])
        return false
            }


            loginuser(email:string,password:string){
        const body={
            email:email,
            password:password
        }
        return this.http.post(this.url+'/login',body)
    }
    registerUser(name:string,email:string,phone:String,password:string,role:String){
        const body={
            name:name,
            email:email,
            phone:phone,
            password:password,
            role:role
        }
        return this.http.post(this.url+'/register',body)
    }

    resetpassUser(email:String,password:String){
      const body={

        email:email,
        password:password
      }

      return this.http.post(this.url+'/resetpassword',body)
    }



  //   updateUser(name:string,email:string,phone:String,password:string,role:String){
  //     const body={

  //       name:name,
  //       email:email,
  //       phone:phone,
  //       password:password,
  //       role:role

  //             }
  //             return this.http.put(this.url+'/update/'+user_id,body)
  // }




  getUser(){
    return this.http.get(this.url)
}

    getUserById(user_id: number){
      return this.http.get(this.url)
  }

}
