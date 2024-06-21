import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbService } from '../services/db.service';
import { Router } from '@angular/router';
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  posts: Post[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private dbService: DbService
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.http
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(
        (response) => {
          this.posts = response;
        },
        (error) => {
          console.error('Error fetching posts:', error);
        }
      );
  }
  toDoNavegacion() {
    this.router.navigate(['home']);
  }
  logout() {
    this.dbService.logout();
  }
}
