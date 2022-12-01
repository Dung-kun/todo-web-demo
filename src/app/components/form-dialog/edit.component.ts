import {
  Component,
  OnInit,
  Inject,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./../../../styles.scss'],
})
export class EditComponent implements OnInit {
  mutiForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mutiForm = this.fb.group({
      title: [
        '',
        Validators.compose([Validators.minLength(4), Validators.required]),
      ],
      author: ['', Validators.required],
      description: [''],
      status: 'In process'
    });
  }

  ngOnInit(): void {
    if(this.data != null) {
      this.setValueForForm(this.data.task.title, this.data.task.author, this.data.task.description, this.data.task.status);
    }
  }

  transData() {
    console.log(this.mutiForm.getRawValue());
    this.dialogRef.close(this.mutiForm.getRawValue());
    this.moveOriginal();
  }

  closeDialog() {
    this.dialogRef.close("none");
    this.moveOriginal();
  }

  setValueForForm(
    nameData: string,
    authorData: string,
    descriptionData: string,
    status: string
  ) {
    // set cac Value cua Form
    this.mutiForm.setValue({
      title: nameData ?? '',
      author: authorData ?? '',
      description: descriptionData ?? '',
      status: status ?? ''
    });
  }

  moveOriginal() {
    // chuyen ve gia tri ban dau
    this.setValueForForm('', '', '', 'In process');
  }
}
