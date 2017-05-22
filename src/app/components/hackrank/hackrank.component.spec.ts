/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackrankComponent } from './hackrank.component';

describe('HackrankComponent', () => {
  let component: HackrankComponent;
  let fixture: ComponentFixture<HackrankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackrankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackrankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
