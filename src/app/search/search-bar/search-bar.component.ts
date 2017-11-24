import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ActivationEnd, ChildActivationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
	searchControl: FormControl;

	private searchSubscription: Subscription;
	private routerSubscription: Subscription;

	constructor(private router: Router) {
		this.searchControl = new FormControl();
	}

	ngOnInit() {
		this.searchSubscription = this.searchControl.valueChanges.pipe(
			debounceTime(1000),
			distinctUntilChanged()
		).subscribe(query => this.navigateSearch(query));
		this.routerSubscription = this.router.events.subscribe(e => {
			if (e instanceof ActivationEnd) {
				let activationEnd : ActivationEnd = e as ActivationEnd;
				console.log('activated', activationEnd.snapshot.params.query)
				this.searchControl.setValue(activationEnd.snapshot.params.query);
			}
		});
	}

	ngOnDestroy() {
		this.searchSubscription.unsubscribe();
		this.routerSubscription.unsubscribe();
	}

	clear() {
		this.searchControl.setValue('');
	}

	private navigateSearch(query: string) {
		if (query) {
			this.router.navigate(['/search', query]);
		} else {
			this.router.navigate(['/search']);
		}
	}
}
