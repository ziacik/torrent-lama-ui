import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../shared.module';
import { ItemCardComponent } from './item-card.component';
import { ItemService } from '../item.service';
import { Item } from '../item';

describe('ItemCardComponent', () => {
	let component: ItemCardComponent;
	let fixture: ComponentFixture<ItemCardComponent>;
	let item: Item;
	let itemService: ItemService;

	beforeEach(async(() => {
		itemService = jasmine.createSpyObj('ItemService', ['add']);
		TestBed.configureTestingModule({
			imports: [SharedModule],
			providers: [{ provide: ItemService, useValue: itemService }]
		}).compileComponents();
	}));

	beforeEach(() => {
		item = { name: 'Some Title' } as Item;
		fixture = TestBed.createComponent(ItemCardComponent);
		component = fixture.componentInstance;
		component.item = item;
		fixture.detectChanges();
	});

	it('displays title of item', () => {
		expect(fixture.nativeElement.textContent).toContain('Some Title');
	});

	describe('#add', () => {
		it('uses item service to add an item via api', () => {
			component.add();
			expect(itemService.add).toHaveBeenCalledWith(item);
		});
	});
});
