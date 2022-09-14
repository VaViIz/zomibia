import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/shared/models/Blog';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogs: Array<Blog> = [];

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {


    this.blogService.getAll().subscribe(blogs => {
      this.blogs = blogs;



    })



  }

  goBlog(name: string) {
    //console.log('/blog/' + name + '')
    this.router.navigateByUrl('/blog/' + name);
  }

}
