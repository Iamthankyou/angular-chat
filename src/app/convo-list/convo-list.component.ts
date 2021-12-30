import {Component, OnInit} from '@angular/core';
import {SelectionService} from '../selection.service';
import {RequestService} from '../request.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Parser} from '@angular/compiler';
import {ActivateRoutes} from '@angular/router/src/operators/activate_routes';

@Component({
  selector: 'app-convo-list',
  templateUrl: './convo-list.component.html',
  styleUrls: ['./convo-list.component.scss']
})
export class ConvoListComponent implements OnInit {

  selection: SelectionService;
  request: RequestService;
  router: Router;

  mobile = false;
  searchTerm = '';
  searchResults: object[] = [];
  notify: any;

  constructor(selection: SelectionService, request: RequestService, router: Router) {
    this.selection = selection;
    this.request = request;
    this.router = router;
  }

  clearSearch() {
    $('#search-bar').val('');
    this.setSearchTerm('');
  }

  setSearchTerm(term) {
    this.searchTerm = term;
    this.searchResults = [];
    setTimeout(() => this.search(term), 1000);
  }

  search(term) {
    if (this.searchTerm === term) {
      if (this.searchTerm !== '') {
        console.log(term);
        this.request.searchConvosFromRequest(this.setResults.bind(this), term);
      }
    }
  }

  setResults(results: object[]): void {
    this.searchResults = results;
  }

  ngOnInit() {
    this.mobile = (window.screen.width < 1024);
    setInterval(this.update.bind(this), 1000);

    // this.notify = this.request.getNoti().reverse();
  }

  update(){
    this.notify = this.request.getNoti();
  }

  btnclick(id) {
    // @ts-ignore
    console.log('Router Navigate');
    // this.router.navigateByUrl('/home');
    // this.router.navigate(['/', id]);
    this.router.navigate(['/']);
    const listConvos = this.request.getConvosFromRequest()[id];
    console.log(listConvos.title);
    console.log(listConvos.member);
    localStorage.setItem('title', listConvos.title);
    localStorage.setItem('idclick', id);
    console.log('Local storage when click: ');
    console.log(localStorage.getItem('idclick'));
    console.log(localStorage.getItem('title'));

    if (listConvos.title === 'Group Chat') {
      const obj = listConvos.member.find(o => o.name === 'You');
      console.log(obj);
      if (obj === undefined){
        console.log("You are not member of group");
        localStorage.setItem('idclick', id);
        this.router.navigate(['/join']);
      }
    }
  }
}
