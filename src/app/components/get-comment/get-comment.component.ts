import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-get-comment',
  templateUrl: './get-comment.component.html',
  styleUrls: ['./get-comment.component.css']
})
export class GetCommentComponent {

  id: number;
  cid: number;
  comments: any[]=[];
  constructor(private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.commentService.getCommentsByPostId(this.id).subscribe( (data) => {
      console.log(data);
      this.comments = data;
      console.log(data);
    },
    (error) => console.log(error));
  }

  pid = this.route.snapshot.params['id'];

  goToPostList() {
    this.router.navigate(['/postlist']);
  }

  updateComment(id: number) {
    console.log("Post id:",this.id,"Comment id:", id);
    this.router.navigate(['updatecomment', this.id, id]); //this.id is post id from params above and, "id" is id of comment
  }

  deleteComment(id: number) {
    if (confirm("Do you want to delete?")) {
      this.commentService.deleteCommentById(this.id, id).subscribe(data => {
        console.log(data);
      })
    } 
  } 

}
