class MStats {

onstructor() {

}

//Factorial
static factorial(num) {
  if (num < 0)
        return -1;
  else if (num == 0)
      return 1;
  else {
      return (num * this.factorial(num - 1));
  }
}

//C сочитание
static c(m,n) {
  return this.factorial(n) /  (this.factorial(m) * this.factorial(n - m));
}

//A размещение
static a(m,n) {
  return this.factorial(n) /  this.factorial(n - m);
}

//P перестановка
static p(n) {
  return this.factorial(n);
}

//P расчитать для несколько предметов в вероятности
static pCC(k,k2,n,n2) {
  return (this.c(k,k2) * this.c(n - k,n2 - k2)) / this.c(n,n2);
}

//Байеса, ahk - массив условных вероятностей A|Hk, hk - массив вероятностей H1, H2, H3...
static baesa(ahk, hk, i) {
  let out;  //массив ответов P(Hk|A)
  let tmp;

  if (!(i === undefined)) {
    tmp = 0;
    for (let j = 0; j < hk.length; j++) {
      tmp += hk[j]*ahk[j];
    }
    out = (hk[i]*ahk[i]) / tmp;
  } else {

    out = [];

    for (let i = 0; i< ahk.length; i++) {
      tmp = 0;
      for (let j = 0; j < hk.length; j++) {
        tmp += hk[j]*ahk[j];
      }
      out[i] = (hk[i]*ahk[i]) / tmp;
    }

  }

  return out;
}

//Бернули
static bernuli(p,n,k) {
  return  this.c(k,n) * Math.pow(p,k) * Math.pow((1-p),n-k);
}

//для Муавра-Лапласа и Пуассона
static x(p,n,k) {
  return (k-n*p)/(Math.sqrt(n*p*(1-p)));
}

//для Муавра-Лапласа и Пуассона
static fi(x) {
  return (1/( Math.sqrt(2*Math.PI)))*Math.exp(-Math.pow(x,2)/2);
}

//Муавра-Лапласа
static muaLaplas(p,n,k) {
  return (1/(Math.sqrt(n*p*(1-p))))*this.fi(this.x(p,n,k));
}

//Пуассона
static puasson(p,n,k) {
  return (Math.pow((n*p),k) / this.factorial(k)) * Math.exp(-n * p);
}

//Математическое ожидание
static mahtExpectation(arrP, arrX) {
  let out = 0;
  for (let i = 0; i <arrX.length; i++) {
    out += arrX[i]*arrP[i];
  }
  return out;

}

//Дисперсия
static dispersion(arrP, arrX) {
  let arrX2 = [];
  for (let i = 0; i <arrX.length; i++) {
    arrX2[i] = Math.pow(arrX[i],2);
  }

  return this.mahtExpectation(arrP, arrX2) - Math.pow(this.mahtExpectation(arrP, arrX),2);
}

//формула интеграла
//n - количество итераций, h - шаг, (x, y) - начальная точка
static EulerFiB(z,n,h, leftRight){
  let y = 0;

  //console.log("3");
  for (let i = 0; i < n; i++) {
   y += h * (z * Math.exp(-(Math.pow(z,2)/2))); //функция первой производной

   if (leftRight < 0) {
     z -= h;
   } else {
     z += h;
   }
   //console.log(y);
  }
  //console.log(y);
  //console.log("4");
  return y; //решение

}

// n - количество итераций, h - шаг, (x, y) - начальная точка
static Euler(x = 0, y = 0, n = 10, h = 0.01) {
    for (let i = 0; i <n; i++) {
        y += h *  (12*x + 5); // функция первой производной
        x += h;
      }
    return [x,y]; // решение
}


//для Муавра-Лапласа Интегральной
static fiB(x) {
  //console.log(x);
  //console.log(1/Math.sqrt(2*Math.PI)) * this.EulerFiB(0, Math.round(x/0.001) ,0.001);
  return (1/Math.sqrt(2*Math.PI)) * this.EulerFiB(0, Math.abs(x/0.0000001) ,0.0000001, x);
}

//Муавра-Лапласа Интегральная
static muaLaplasI(p ,n ,k1 ,k2) {
  //console.log("1");
  return this.fiB(this.x(p,n,k2)) - this.fiB(this.x(p,n,k1));
}

}
