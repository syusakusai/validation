import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl, ValidatorFn, NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'start';
  registerForm: FormGroup;
  submitted = false;
  values;
   orders = [
    { id: 1, name: 'Mancing' },
    { id: 2, name: 'Nonton' },
  ];

  user = {
    skills: [
      { name: 'JS',  selected: true, id: 1 },
      { name: 'CSS',  selected: false, id: 2 },
    ]
  }

  arrayItems: {
    id: number;
    title: string;
  }[];

  catsList = [{cName:"Mancing"},{cName:"Nonton"},{cName:"Bermain"}];
  
  isAvailable = false;


  constructor(private formBuilder: FormBuilder) { 
    const control = this.catsList.map((d)=>new FormControl())
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required,     Validators.pattern(/^[A-Z][ a-z0-9_-]{3,19}$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        gender: ['', Validators.required],
        username: ['', [Validators.required, Validators.maxLength(10)]],
        // orders: new FormArray([], this.minSelectedCheckboxes(1)),
      password: ['', [Validators.required, Validators.minLength(7)]],
      // demoArray: this.formBuilder.array([]),
      Categories: new FormArray(control,{updateOn:"submit"})
  });
  // this.addCheckboxes();

this.arrayItems = [];
  
 

  }
  get catControl() {
    return this.registerForm.get('Categories')['controls'];
  }
  get skills() {
    return this.registerForm.get('skills');
  };
   minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);
  
      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;
  }

  get demoArray() {
    return this.registerForm.get('demoArray') as FormArray;
 }
 addItem(item) {
    this.arrayItems.push(item);
    this.demoArray.push(this.formBuilder.control(false));
 }
 removeItem() {
    this.arrayItems.pop();
    this.demoArray.removeAt(this.demoArray.length - 1);
 }

 
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    console.log(this.registerForm.invalid)
    if (this.registerForm.invalid) {
        return;
    }


    this.values = this.registerForm.value;

    alert('SUCCESS!!')
}
private addCheckboxes() {
  this.orders.map((o, i) => {
    const control = new FormControl(i === 0); // if first item set to true, else false
    (this.registerForm.controls.orders as FormArray).push(control);
  });
}

reset(formArray: FormArray) {
  this.registerForm.reset()
}
}
