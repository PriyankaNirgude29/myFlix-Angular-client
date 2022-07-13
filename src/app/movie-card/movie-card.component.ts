import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorComponent } from '../director/director.component';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  currentUser: any = null;
  currentFavs: any[] = [];

  constructor(public fetchApiData: FetchApiDataService,
   public dialogRef: MatDialog
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
   
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      }
    );
}

getUser(): void {
  const username = localStorage.getItem('user');
  this.fetchApiData.getUser(username).subscribe((resp: any) => {
    this.currentUser = resp.Username;
    this.currentFavs = resp.FavoriteMovies;
  });
}

openDirectorDialog(Name: string, Bio: string, Birth: Date): void {
  this.dialogRef.open(DirectorComponent, {
    data: {
      Name: Name,
      Bio: Bio,
      Birth: Birth,
    },
    // Assign dialog width
    width: '500px'
  });

}

openGenreDialog(Name: string, Description: string): void {
  this.dialogRef.open(GenreComponent, {
    data: {
      Name: Name,
      Description: Description,
    },
    // Assign dialog width
    width: '500px'
  });
}

openSynopsisDialog(title: string, description: string): void {
  this.dialogRef.open(SynopsisComponent, {
    data: {
      Title: title,
      Description: description,
    },
    // Assign dialog width
    width: '500px'
  });

}

isFav(id: string): boolean {
  return this.currentFavs.includes(id);
}


addToFavoriteMovies(id: string): void {
  console.log(id);
  this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
    console.log(result);
    this.ngOnInit();
  })
}

removeFromFavoriteMovies(id: string): void {
  console.log(id);
  this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
    console.log(result);
    this.ngOnInit();
  })
}
}
