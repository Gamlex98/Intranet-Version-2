/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CesantiasComponent } from './cesantias.component';

describe('CesantiasComponent', () => {
  let component: CesantiasComponent;
  let fixture: ComponentFixture<CesantiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CesantiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CesantiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
