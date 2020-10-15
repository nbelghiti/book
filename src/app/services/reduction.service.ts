import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ReductionService {
  url = "http://henri-potier.xebia.fr/books/";

  constructor(private http: HttpClient) {}

  getReduction(idBooks) {
    return this.http.get(this.url + idBooks + "/commercialOffers");
  }
}
