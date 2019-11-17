import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [routerTransition()]
})
export class CategoryComponent implements OnInit {

  categoryModel = new Category;
  categories;
  isEdit=false;
  category;
  closeResult: string;

  constructor(private categoryService: CategoryService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    return this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    }, err => {
      console.log(err);
    });
  }

  onCategory() {
    console.log(this.categoryModel);
      this.categoryService.createCategory(this.categoryModel)
        .subscribe(
          data => {
            console.log("Success", data);
            this.getCategories();
            // this.isEdit=true;
          },
          error => console.log("Error", error)
        );
  }

  // When click edit on a category
  onEdit(id){
    this.isEdit=true;
    return this.categoryService.getCategory(id).subscribe(res => {
      this.category=res
      this.categoryModel.name = this.category.name;
      this.categoryModel.description = this.category.description;
    }, err => {
      console.log(err);
    });
  }

  // when submiting the edited values
  editCategory(id){
    return this.categoryService.editCategory(id,this.categoryModel).subscribe(res => {
      console.log(res);
      this.getCategories();
      this.isEdit=false;
    }, err => {
      console.log(err);
    });
  }

  deleteCategory(id){
    return this.categoryService.deleteCategory(id).subscribe(res => {
      console.log(res);
      this.getCategories();
    }, err => {
      console.log(err);
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
