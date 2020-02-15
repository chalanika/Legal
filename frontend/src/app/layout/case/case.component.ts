import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from 'src/app/core/services/case.service';
import { UserService } from 'src/app/user.service';
import { Case } from 'src/app/core/models/case';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
  animations: [routerTransition()]
})
export class CaseComponent implements OnInit {

  caseId;
  caseNew;
  client;
  imageUrl;
  constructor(private route:ActivatedRoute, private _caseService:CaseService,private _userService:UserService) { }

  ngOnInit() {
    this.caseId = this.route.snapshot.params.caseId;
    console.log(this.caseId);
    this.getCase(this.caseId);

  }
  
  getCase(caseId){
    this._caseService.getCase(caseId).subscribe(
      res=>{
        console.log(res);
        this.caseNew=res;
        this.getClientDetail(this.caseNew.client_id);
      },err=>{
        console.log(err);
      }
    )
  }

  getClientDetail(id){
    this._userService.getClient(id).subscribe(
      res=>{
        this.client = res;
        this.displayClientPic();
        console.log(this.client);
      },err=>{
        console.log(err);
      }
    )
  }

  displayClientPic(){
    if(this.client.image){
      var path = this.client.image.replace(/\\/g, '/');
      path = path.replace(/public/g, '');
      this.imageUrl = 'http://localhost:3000/' + path; 
    }
  }


}
