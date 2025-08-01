import { Component, OnInit } from '@angular/core';
import { BriefsService } from '../services/briefs.service';
import { CommonModule } from '@angular/common';


export interface Briefs {
  id: number;
  title: string;
}

@Component({
  selector: 'app-briefs',
  imports: [CommonModule],
  templateUrl: './briefs.component.html',
  styleUrls: ['./briefs.component.css']
})
export class BriefsComponent implements OnInit {

 briefs = [
    { name: 'Site Portfolio Personnel', description: '2 apprenant(s) assigné(s)', difficulty: 'beginner', assigned: '2' },
    { name: 'Application React Todo', description: '1 apprenant(s) assigné(s)', difficulty: 'intermediate', assigned: '1' },
    { name: 'Ea est dolorem aliquu', description: '2 apprenant(s) assigné(s)', difficulty: 'advanced', assigned: '2' }
  ];

  

  Briefs: Briefs[] = [];
  router: any;


constructor(private briefservice:BriefsService) { }


ngOnInit(): void {
  this.loadBriefs();
  }

   loadBriefs(): void {
    this.briefservice.getBriefs().subscribe({
      next: (data) => {
        this.Briefs = data;
      },
     
    });
  }


   deleteBrief(id: number): void {
    this.briefservice.deleteBrief(id).subscribe({
      next: () => {
        this.router.navigate(['/briefs']);
      },
   
    });
  }


}
