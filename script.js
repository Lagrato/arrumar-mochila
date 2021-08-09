function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const Materiais = {
  HIS_1A: 0,
  HIS_1B: 1,
  HIS_2A: 2,
  HIS_2B: 3,
  BIO_1A: 4,
  BIO_1B: 5,
  BIO_2A: 6,
  BIO_2B: 7,
  RED_1A: 8,
  RED_1B: 9,
  RED_2: 10,
  FIS_1A: 11,
  FIS_1B: 12,
  FIS_2A: 13,
  FIS_2B: 14,
  FIS_APOSTILA: 15,
  ING_1A: 16,
  ING_1B: 17,
  ING_2: 18,
  QUI_1A: 19,
  QUI_1B: 20,
  QUI_2A: 21,
  QUI_2B: 22,
  QUI_APOSTILA: 23,
  MAT_1A: 24,
  MAT_1B: 25,
  MAT_2A: 26,
  MAT_2B: 27,
  SOC_1A: 28,
  SOC_1B: 29,
  SOC_2: 30,
  FIL_1A: 31,
  FIL_1B: 32,
  FIL_2: 33,
  GEO_1A: 34,
  GEO_1B: 35,
  GEO_2A: 36,
  GEO_2B: 37,
  POR_1A: 38,
  POR_1B: 39,
  POR_2A: 40,
  POR_2B: 41,
  ART_1A: 42,
  ART_1B: 43,
  ART_2: 44,
  SEM_APOSTILA: 45
}

class Materia {
  constructor(...material) {
    this.material = [...material];
  }
}

class DiaDeAula {
  constructor(...materias) {
    this.materias = [...materias];
  }

  getDiferenca(other) {
    let thisMaterial = [];

    for (let materia of this.materias) {
      thisMaterial = Array.from(new Set(thisMaterial.concat(materia.material))).sort();
    }
    let otherMaterial = [];

    for (let materia of other.materias) {
      otherMaterial = Array.from(new Set(otherMaterial.concat(materia.material))).sort();
    }

    const remover = [];
    const adicionar = [];

    for (let material of thisMaterial) {
      if (!otherMaterial.includes(material) && !remover.includes(material)) {
        remover.push(material);
      }
    }
    for (let material of otherMaterial) {
      if (!thisMaterial.includes(material) && !adicionar.includes(material)) {
        adicionar.push(material);
      }
    }

    const removerFormatted = [];
    const adicionarFormatted = [];
    const totalFormatted = [];

    for (let materiaId of remover) {
      const splittedName = Object.keys(Materiais)[materiaId].split('_');
      const materia = splittedName.shift();
      const material = splittedName;
      removerFormatted.push(`- ${capitalize(material.join(' '))} de ${capitalize(materia)}`);
    }

    for (let materiaId of adicionar) {
      const splittedName = Object.keys(Materiais)[materiaId].split('_');
      const materia = splittedName.shift();
      const material = splittedName;

      adicionarFormatted.push(`+ ${capitalize(material.join(' '))} de ${capitalize(materia)}`);
    }

    for (let materiaId of otherMaterial) {
      const splittedName = Object.keys(Materiais)[materiaId].split('_');
      const materia = splittedName.shift();
      const material = splittedName;

      totalFormatted.push(`* ${capitalize(material.join(' '))} de ${capitalize(materia)}`);
    }

    return [removerFormatted, adicionarFormatted, totalFormatted];
  }
}

const Historia_A = new Materia(Materiais.HIS_1B, Materiais.HIS_2A);
const Historia_B = new Materia(Materiais.HIS_1B, Materiais.HIS_2A);
const Redacao = new Materia(Materiais.RED_1B, Materiais.RED_2);
const Fisica = new Materia(Materiais.FIS_APOSTILA);
const Ingles = new Materia(Materiais.ING_1B);
const Quimica = new Materia(Materiais.QUI_2A, Materiais.QUI_APOSTILA);
const Matematica_A = new Materia(Materiais.MAT_1B, Materiais.MAT_2A);
const Matematica_B = new Materia(Materiais.MAT_2A);
const Matematica_C = new Materia(Materiais.MAT_1B, Materiais.MAT_2A);
const Artes = new Materia(Materiais.ART_1B, Materiais.ART_2);
const Filosofia = new Materia(Materiais.FIL_1B, Materiais.FIL_2);
const Sociologia = new Materia(Materiais.SOC_1B, Materiais.SOC_2);
const Biologia_A = new Materia(Materiais.BIO_1B, Materiais.BIO_2A);
const Biologia_B = new Materia(Materiais.BIO_2A);
const Geografia = new Materia(Materiais.GEO_1B, Materiais.GEO_2A);
const Literatura = new Materia(Materiais.POR_2A);
const Gramatica = new Materia(Materiais.POR_1B, Materiais.POR_2A);
const Texto = new Materia(Materiais.POR_1B, Materiais.POR_2A);
const Semente = new Materia(Materiais.SEM_APOSTILA);

const Segunda = new DiaDeAula(Historia_B, Redacao, Fisica, Ingles, Quimica, Matematica_C);
const Terca = new DiaDeAula(Historia_A, Fisica, Matematica_A, Sociologia, Biologia_B, Geografia, Quimica, Biologia_A);
const Quarta = new DiaDeAula(Gramatica, Texto, Historia_B, Literatura, Geografia, Matematica_A, Artes, Matematica_B);
const Quinta = new DiaDeAula(Gramatica, Texto, Quimica, Biologia_A, Fisica, Biologia_B, Geografia, Semente);
const Sexta = new DiaDeAula(Fisica, Matematica_B, Filosofia, Matematica_A);

const Dias = {
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta
}

window.onload = () => {
  const dropDowns = document.getElementsByTagName('select');
  const remover = document.getElementById('remover1');
  const adicionar = document.getElementById('adicionar1');
  const total = document.getElementById('tudo1');

  const onDropDownChange = () => {
    const dia1Name = dropDowns[0].value;
    const dia2Name = dropDowns[1].value;

    const dia1 = Dias[dia1Name];
    const dia2 = Dias[dia2Name];

    const diferenca = dia1.getDiferenca(dia2);

    const apagar = document.getElementsByClassName('apagar');

    apagar[0].innerHTML = '';
    apagar[1].innerHTML = '';
    apagar[2].innerHTML = '';

    for (let x of diferenca[0]) {
      newP = document.createElement('p');
      newP.textContent = x;
      newP.className = 'materialDaMala';
      remover.appendChild(newP);
    }

    for (let x of diferenca[1]) {
      newP = document.createElement('p');
      newP.textContent = x;
      newP.className = 'materialDaMala';
      adicionar.appendChild(newP);
    }

    for (let x of diferenca[2]) {
      newP = document.createElement('p');
      newP.textContent = x;
      newP.className = 'materialDaMala';
      total.appendChild(newP);
    }
  }
  
  const date = new Date();
  const weekDay = date.getDay();

  if (weekDay === 0 && weekDay === 6) {
    dropDowns[0].selectedIndex = 4;
    dropDowns[1].selectedIndex = 0;
  } else if (weekDay + 1 === 6) {
    dropDowns[0].selectedIndex = 4;
    dropDowns[1].selectedIndex = 0;
  } else {
    dropDowns[0].selectedIndex = weekDay - 1;
    dropDowns[1].selectedIndex = weekDay;
  }
  onDropDownChange();

  for (let dropDown of dropDowns) {
    dropDown.addEventListener('change', () => onDropDownChange());
  }
}
