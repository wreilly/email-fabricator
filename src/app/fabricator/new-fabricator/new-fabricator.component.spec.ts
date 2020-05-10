import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { NewFabricatorComponent, MatHeaderRowDef } from './new-fabricator.component';
import { MatTableModule} from '@angular/material/table';

// https://stackoverflow.com/questions/51085422/property-binding-matheaderrowdef-not-used-by-any-directive-on-an-embedded-templa
// https://onehungrymind.com/writing-basic-component-test-angular-testing-utilities/
// https://angular.io/api/core/testing/ComponentFixture
// https://www.digitalocean.com/community/tutorials/angular-introduction-unit-testing

describe('WR__ NewFabricatorComponent', () => {
    let myComponent: NewFabricatorComponent;
    let myFixture: ComponentFixture<NewFabricatorComponent>;

    beforeEach( async( () => {
        TestBed.configureTestingModule({
            declarations: [ NewFabricatorComponent, MatHeaderRowDef ],
            imports: [ MatTableModule ],
        }).compileComponents(); // << compile needs async
    })); // /beforeEach()

    beforeEach( () => {
        myFixture = TestBed.createComponent(NewFabricatorComponent);
        myComponent = myFixture.componentInstance;
        myFixture.detectChanges();
    });

    it('WR__ should create', () => {
        expect(myComponent).toBeTruthy();
    });

}); // /describe()
