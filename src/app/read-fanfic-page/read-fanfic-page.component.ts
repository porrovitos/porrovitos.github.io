import { Component, OnInit } from '@angular/core';
import { Fanfic } from 'src/app/model/fanfic';
import { Comment } from 'src/app/model/comment';
import { FanficService } from 'src/app/service/fanfic.service';
import { FavoriteService } from 'src/app/service/favorite.service';
import { CommentService } from 'src/app/service/comment.service';
import { LikeService } from 'src/app/service/like.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms';
import { User } from 'src/app/model/user';
import { CookieService } from 'ngx-cookie-service';
import { favoriteEmitters } from '../emmiters/favoriteEmmiter';
import { likeEmmiters } from '../emmiters/likeEmmiter';


@Component({
  selector: 'app-read-fanfic-page',
  templateUrl: './read-fanfic-page.component.html',
  styleUrls: ['./read-fanfic-page.component.css']
})

export class ReadFanficPageComponent implements OnInit {
  
  inFavorite = false;
  UserLike = false;
  public fanfic: Fanfic;
  public fanficForComment: Fanfic;
  public comments: Comment[];
  public fanficToReadArray: String[];
  public id: number;
  public user: User;
  public commentForm: FormGroup;
  public favoriteForm: FormGroup;
  
  constructor(
    private fanficService: FanficService, 
    private likeService: LikeService, 
    private favoriteService: FavoriteService, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private cookieService : CookieService){}

  ngOnInit(){


    likeEmmiters.likeEmmitter.subscribe(
      (like: boolean) => {
        this.UserLike = like;
      }
    );
    favoriteEmitters.favoriteEmmitter.subscribe(
      (favorite: boolean) => {
        this.inFavorite = favorite;
      }
    );
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.setFanfic();
    this.setComments();
    this.checkFavorite();
    this.checkLike();
    this.user = JSON.parse(this.cookieService.get('user'));
    this.commentForm = this.formBuilder.group({
      text: '',
      fanfic : '',
      user : this.user
    });
  }


  public OnSubmit(formValue: any) {
    let text = this.commentForm.get('text')?.value
    console.log(this.fanfic);
    this.commentForm = this.formBuilder.group({
      text: text,
      fanfic : this.fanfic,
      user : this.user
    });
    this.commentService.addComment(this.commentForm.getRawValue()) 
  }

  public setFanfic() : void{
    this.fanficService.readFanfics(this.id).subscribe(
      (response: Fanfic) =>{
        this.fanfic = response
        console.log(this.fanfic)
        this.fanficToReadArray = response.fanfic.split(":;!");
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
    public setComments() : void{
      this.commentService.getCommentsByFanfic(this.id).subscribe(
        (response: Comment[]) =>{
          this.comments = response
        },
        (error : HttpErrorResponse) =>{
          alert(error.message);
        }
        );
    }

    public checkFavorite(){
      this.user= JSON.parse(this.cookieService.get('user'));
      console.log(this.fanfic);
      console.log(this.user);
      this.favoriteService.getFavoriteByFanficAndUser(this.id,this.user).subscribe(
        res => {
          console.log(res);
          if(res == null){
            favoriteEmitters.favoriteEmmitter.emit(false)
          }
          else{
            favoriteEmitters.favoriteEmmitter.emit(true)
          }
        },
        (error : HttpErrorResponse) =>{
          alert(error.message);
        }
      );
    }
    public addToFavorite(){
      this.user= JSON.parse(this.cookieService.get('user'));
      favoriteEmitters.favoriteEmmitter.emit(true);
      this.favoriteForm = this.formBuilder.group({
        user : this.user,
        fanfic : this.fanfic
      });
      this.favoriteService.addToFavorite(this.favoriteForm.getRawValue())
    }

    public removeFromFavorite(){
      this.user= JSON.parse(this.cookieService.get('user'));
      favoriteEmitters.favoriteEmmitter.emit(false);
      this.favoriteForm = this.formBuilder.group({
        user : this.user,
        fanfic : this.fanfic
      });
      this.favoriteService.deleteFavoriteByFanficAndUser(this.id,this.user)
    }

    public checkLike(){
      this.user= JSON.parse(this.cookieService.get('user'));
      console.log(this.fanfic);
      console.log(this.user);
      this.likeService.getLikeByFanficAndUser(this.id,this.user).subscribe(
        res => {
          console.log(res);
          if(res == null){
            likeEmmiters.likeEmmitter.emit(false)
          }
          else{
            likeEmmiters.likeEmmitter.emit(true)
          }
        },
        (error : HttpErrorResponse) =>{
          alert(error.message);
        }
      );
    }

    public addLike(){
      this.user= JSON.parse(this.cookieService.get('user'));
      likeEmmiters.likeEmmitter.emit(true);
      this.favoriteForm = this.formBuilder.group({
        user : this.user,
        fanfic : this.fanfic
      });
      this.likeService.addLike(this.favoriteForm.getRawValue())
    }

    public deleteLike(){
      this.user= JSON.parse(this.cookieService.get('user'));
      likeEmmiters.likeEmmitter.emit(false);
      this.favoriteForm = this.formBuilder.group({
        user : this.user,
        fanfic : this.fanfic
      });
      this.likeService.deleteLikeByFanficAndUser(this.id,this.user)
    }

    
}

