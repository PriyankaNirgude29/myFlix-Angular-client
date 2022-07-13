import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {

  @Input() userCredentials = { Username: '', Password: '' };


  constructor( public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe({
      next: (r) => {
        this.dialogRef.close();
        console.log(r);
        localStorage.setItem('token', r.token);
      localStorage.setItem('user', r.user.Username);
      this.router.navigate(['movies']);
    } , 
    error: (e) => {
      console.log(e);
      this.snackBar.open(e, 'OK', {
        duration: 2000
      });
    }
  });
}
}
