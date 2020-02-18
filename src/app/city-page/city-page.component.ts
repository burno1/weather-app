import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import { Cidade } from "../Model/Cidade";
import { Clima } from "../Model/Clima";

@Component({
  selector: "app-city-page",
  templateUrl: "./city-page.component.html",
  styleUrls: ["./city-page.component.css"]
})
export class CityPageComponent implements OnInit {
  idCidade: number;
  climas$: Object[];
  cidadeForm = new FormControl("");
  cidade: Cidade;
  lista: any[];
  listaClimas: any[];
  monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dataAtual;

  constructor(private route: ActivatedRoute, private data: DataService) {
    this.route.params.subscribe(params => {
      this.idCidade = params.id;
    });
  }

  ngOnInit(): void {
    const novaData = new Date();
    this.dataAtual = novaData.getHours()
    +":"
    + novaData.getMinutes()+ " " 
    +  novaData.getDate() + " " 
    + this.monthNames[novaData.getMonth()];
    
    this.data.getDetalhesCidade(this.idCidade).subscribe(data => {
      this.lista = data["list"].slice(0, 5);

      this.cidade = { ...this.cidade, ...data["city"] };

      this.lista.forEach((element, index) => {
        let date = element["dt"];
        let dataConvertida = new Date(date * 1000);
        let weather = element["weather"][0];
        let main = element["main"];
        let hora = dataConvertida.getHours();
        let minutos = dataConvertida.getMinutes() != 0 ? dataConvertida.getMinutes() : '00';
        let dia = dataConvertida.getDate();
        let diaSemana = this.days[dataConvertida.getDay()];
        let mes = this.monthNames[dataConvertida.getMonth()];
        var clima = {
          icon: weather.icon,
          description: weather.description,
          temp_max: main.temp_max,
          temp_min: main.temp_min,
          dia: [diaSemana] + " " + dia + " " + mes,
          hora: hora + ":" + minutos
        };

        this.lista[index] = clima;
      });

      this.pesquisarPorID();
      console.log();
    });
  }

  pesquisar() {
    this.data.getCidade(this.cidadeForm.value).subscribe(data => {
      
      let clima: Clima;
      let sunsetTimeH;
      let sunsetTimeM;
      let sunriseTimeH;
      let sunriseTimeM;
      let main = data["main"];
      let sys = data["sys"];
      this.cidade = { ...this.cidade, ...data["main"] };
      this.cidade = { ...this.cidade, ...data["sys"] };
      this.cidade.name = data.name;
      this.cidade.dt = data.dt;
      this.cidade.id = data.id;
      
      sunsetTimeH = new Date(this.cidade.sunset * 1000).getHours();
      sunsetTimeM = new Date(this.cidade.sunset * 1000).getMinutes();
      this.cidade.sunset = sunsetTimeH + ":" + sunsetTimeM;
      
      sunriseTimeH = new Date(this.cidade.sunrise * 1000).getHours();
      sunriseTimeM = new Date(this.cidade.sunrise * 1000).getMinutes();
      this.cidade.sunrise = sunriseTimeH + ":" + sunsetTimeM;
      
      
      clima = { ...clima, ...data["weather"][0] };
      clima = { ...clima, ...data["main"] };
      this.cidade.clima = clima;
      
      this.cidadeForm.setValue(this.cidade.name) ;
    });
  }
  pesquisarPorID() {
    this.data.getCidadeId(this.idCidade).subscribe(data => {
      
      let clima: Clima;
      let sunsetTimeH;
      let sunsetTimeM;
      let sunriseTimeH;
      let sunriseTimeM;
      let main = data["main"];
      let sys = data["sys"];
      this.cidade = { ...this.cidade, ...data["main"] };
      this.cidade = { ...this.cidade, ...data["sys"] };
      this.cidade.name = data.name;
      this.cidade.dt = data.dt;
      this.cidade.id = data.id;
      
      sunsetTimeH = new Date(this.cidade.sunset * 1000).getHours();
      sunsetTimeM = new Date(this.cidade.sunset * 1000).getMinutes();
      this.cidade.sunset = sunsetTimeH + ":" + sunsetTimeM;
      
      sunriseTimeH = new Date(this.cidade.sunrise * 1000).getHours();
      sunriseTimeM = new Date(this.cidade.sunrise * 1000).getMinutes();
      this.cidade.sunrise = sunriseTimeH + ":" + sunsetTimeM;
      
      
      clima = { ...clima, ...data["weather"][0] };
      clima = { ...clima, ...data["main"] };
      this.cidade.clima = clima;
      
      this.cidadeForm.setValue(this.cidade.name) ;
    });
  }
}
