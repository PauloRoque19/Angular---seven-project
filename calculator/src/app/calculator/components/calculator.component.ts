import { CalculatorService } from './../services/calculator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  private numero1: string;
  private numero2: string;
  private resultado: number;
  private operacao: string;

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit(): void {
    this.limpar();
  }

  public limpar(): void {
    this.numero1 = '0';
    this.numero2 = null;
    this.resultado = null;
    this.operacao = null;
  }

  public adicionarNumero(numero: string): void {

    if(this.operacao === null){
      this.numero1 = this.concatenarNumero(this.numero1, numero);
    }
    else {
      this.numero2 = this.concatenarNumero(this.numero2, numero);
    }
  }

  public concatenarNumero(numAtual: string, numConcat: string): string {
    if(numAtual === '0' || numAtual === null) numAtual = '';
    if(numConcat === '.' && numAtual === '') return '0.';
    if(numConcat === '.' && numAtual.indexOf('.') > -1) return numAtual;
    return numAtual + numConcat
  }

  public definirOperacao(operacao: string): void {
    if(this.operacao === null){
      this.operacao = operacao;
      return;
    }

    if(this.numero2 !== null){
      this.resultado = this.calculatorService.calcular(parseFloat(this.numero1) ,  parseFloat(this.numero2), this.operacao);
      this.operacao = operacao;
      this.numero1 = this.resultado.toString();
      this.numero2 = null;
      this.resultado = null;
    }
  }

  public calcular(): void {
    if(this.numero2 === null){
      return;
    }
    this.resultado = this.calculatorService.calcular(parseFloat(this.numero1) ,  parseFloat(this.numero2), this.operacao);
  }

  get display(): string{
     if(this.resultado !== null) return this.resultado.toString();
     if(this.numero2 !== null) return this.numero2;
     return this.numero1;
  }

}
