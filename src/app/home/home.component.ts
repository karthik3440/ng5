import { Component, OnInit, Optional } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger}from'@angular/animations'
import { DataService} from '../data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('goals',[
    transition('*=>*',[
    query(':enter',style({opacity:0}), {optional:true}),
   
   
    query(':enter',stagger('300ms',[
    animate('.6s ease-in',keyframes([
    style({opacity:0 ,transition:'translateY(-75%)',offset:0 }),
    style({opacity:.5 ,transition:'translateY(35%)',offset:.3 }),
    style({opacity:1 ,transition:'translateY(0)',offset:1 }),
]))]),{optional:true}),

query(':leave',stagger('300ms',[
  animate('.6s ease-in',keyframes([
  style({opacity:1 ,transition:'translateY(0)',offset:0 }),
  style({opacity:.5 ,transition:'translateY(35px)',offset:.3 }),
  style({opacity:0 ,transition:'translateY(-75%)',offset:1 }),
]))]),{optional:true})

 ])
   ])
      ]
        })
export class HomeComponent implements OnInit {
ItemCount: number=4;
btntext:string='Add an item';
goaltext:string='My first life goal';
goals=[];
  constructor(private _data:DataService) { }

  ngOnInit() {
    this._data.goal.subscribe(res=>this.goals=res);
    this.ItemCount=this.goals.length;
    this._data.changegoal(this.goals);
  }

  additem(){
this.goals.push(this.goaltext);
this.goaltext='';
this.ItemCount= this.goals.length;
this._data.changegoal(this.goals);

  }

  removeItem(i)
  {
    this.goals.splice(i,1);
    this._data.changegoal(this.goals);

  }

}