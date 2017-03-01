/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {MessagelistComponent} from './messagelist.component';

describe('MessagelistComponent', () => {
    let component: MessagelistComponent;
    let fixture: ComponentFixture<MessagelistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MessagelistComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessagelistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
