import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Paises } from 'src/model/Pais';

@Injectable()
export class PaisesService {
  urlGlobal: string = 'https://restcountries.com/v2/all';

  async findByContinente(continente: string): Promise<Paises[]> {
    const response = await axios.get(this.urlGlobal);
    const paises: Paises[] = response.data.filter(p=>p.region==continente)
    .map(p=>new Paises(p.name,p.region,p.population,p.capital,p.flag))
    return paises;
  }

  async findAllContinentes():Promise<string[]> {
    const response = await axios.get(this.urlGlobal)
    const region:string[]=response.data // JSON de la respuesta
    .map(p=>p.region) //Array de string con los nombres de continentes, pero duplicados
    return [...new Set(region)] // Sin duplicados
  }

  async findPoblacionMax():Promise<Paises>{
    const response = await axios.get(this.urlGlobal)
    const pais:Paises[]=response.data
    .map(p=>new Paises(p.name,p.region,p.population,p.capital,p.capital))
    return pais.reduce((max,actual)=>{
      if(actual.poblacion>max.poblacion){
        return actual
      }else{
        return max
      }
    })

  }
}