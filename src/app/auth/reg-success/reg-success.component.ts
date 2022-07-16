import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-reg-success',
  templateUrl: './reg-success.component.html',
  styleUrls: ['./reg-success.component.css']
})
export class RegSuccessComponent implements OnInit {
  token:any
  constructor(private _activatedRoute:ActivatedRoute,private _route:Router,private _auth:AuthService) { }

  ngOnInit(): void {
    this.token=this._activatedRoute.snapshot.paramMap.get('token');
    localStorage.setItem('token',this.token);

    this._route.navigate(['/home']);



  }

}
