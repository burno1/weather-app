import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DataService } from "../data.service";
import { Cidade } from "../Model/Cidade";
import { Clima } from "../Model/Clima";

@Component({
  selector: "app-landing-page",

  templateUrl: "./landing-page.component.html",

  styleUrls: ["./landing-page.component.css"]
})
export class LandingPageComponent implements OnInit {
  cidadeForm = new FormControl("");
  cidade: Cidade;

  constructor(private data: DataService) {}
  ngOnInit() {}

  pesquisar() {
    this.data.getCidade(this.cidadeForm.value).subscribe(data => {
      let clima: Clima;
      let main = data["main"];
      let sys = data["sys"];
      this.cidade = { ...this.cidade, ...data["main"] };
      this.cidade = { ...this.cidade, ...data["sys"] };
      this.cidade.name = data.name;
      this.cidade.dt = data.dt;
      this.cidade.id = data.id;

      clima = { ...clima, ...data["weather"][0] };
      clima = { ...clima, ...data["main"] };
      this.cidade.clima = clima;
    });
  }
}
