// ****Enabling & disabling  sections****

var autorskie = document.querySelector("input[name=autorskie]");

autorskie.addEventListener('change', function () {
  if (this.checked) {
    document.querySelector("input[name=udzial]").classList.remove("hidden");
    document.querySelector("input[name=dniWolne]").classList.remove("hidden");
    console.log("Checked");

  } else {
    document.querySelector("input[name=udzial]").classList.add("hidden");
    document.querySelector("input[name=dniWolne]").classList.add("hidden");
    console.log("Unchecked");

  }
})






// ****Main Listeners***
document.addEventListener('change', obliczenia);
document.addEventListener('keyup', obliczenia);



// ***Calculations***

function obliczenia() {

  // Input:
  var brutto = document.querySelector("#brutto").value;
  var pozaMiejscemZam = document.querySelector("input[name=miejsce]:checked").value;
  var dzielo = document.querySelector("#autorskie").checked;
  var dzieloPercent = document.querySelector("#udzial").value;
  var numerOfDays = document.querySelector("#dniWolne").value;
  var sickDays = document.querySelector("#sickDays").value;
  var sklWypProc = document.querySelector("#sklWyp").value;

  console.log(brutto);
  console.log("Wybrana opcja miejsca: " + pozaMiejscemZam);
  console.log("Wybrana opcja dzieła: " + dzielo);
  console.log("Wpisana wartość %: " + dzieloPercent);
  console.log("Wolne dni: " + numerOfDays);
  console.log("Składka wypadkowa w %: " + sklWypProc);

  // *** Hidding sickleave days:
  var sickleave = document.querySelector('#sickleave option:checked').value;
  console.log("Zwolnienie: " + sickleave);
  if (sickleave == "brak") {
    // document.querySelector("input[name=sickDays]").setAttribute("disabled", "disabled");
    document.querySelector("input[name=sickDays]").classList.add("hidden");
    sickDays = 0;

  } else if (sickleave == "wypadek") {

    document.querySelector("input[name=sickDays]").classList.remove("hidden")
  } else if (sickleave == "choroba") {

    document.querySelector("input[name=sickDays]").classList.remove("hidden")
  } else if (sickleave == "szpital") {

    document.querySelector("input[name=sickDays]").classList.remove("hidden")
  } else {
    console.log("WTF")
  }





  // CHOROBOWE:
  var podstawNalChor = (brutto - (brutto * 0.1371)).toFixed(2);
  console.log("Obliczona Podstawa to " + podstawNalChor);
  var podstawNalChor = (brutto - (brutto * 0.1371)).toFixed(2);
  console.log("Obliczona Podstawa to " + podstawNalChor);

  if (podstawNalChor < 1941.53) {
    podstawNalChor = 1941.53;
    console.log("Podstawa dopełniona do " + podstawNalChor)
  } else {
    console.log("Podstawa " + podstawNalChor + " wyższa od 1941.53 więc brak dopełnienia.")
  }

  var stawkaDzienna = (podstawNalChor / 30).toFixed(2);
  console.log("Stawka to " + stawkaDzienna);
  var radio = sickleave
  // document.querySelector("input[name=radio]:checked").value;
  console.log("Wybrana opcja:" + radio);

  var choroba = 0.8;
  var szpital = 0.7;
  var wypadek = 1;

  if (radio == "choroba") {
    stawkaDzienna = (stawkaDzienna * choroba).toFixed(2)
  } else if (radio == "szpital") {
    stawkaDzienna = (stawkaDzienna * szpital).toFixed(2)
  } else if (radio == "wypadek") {
    stawkaDzienna = (stawkaDzienna * wypadek).toFixed(2)
  }
  console.log("Stawka po odliczeniu % to " + stawkaDzienna);

  var zasilekChorobowy = (sickDays * stawkaDzienna);
  var wynagrodzZaDniPrzepracowane = (brutto - (brutto / 30 * sickDays));

  console.log("Zasiłek chorobowy to " + zasilekChorobowy + " a wynagrodzenie za dni przepracowane to " + wynagrodzZaDniPrzepracowane)


  // KUP:
  var kup = 0;
  if (pozaMiejscemZam == "pracaPoza" && dzielo == false) {
    kup = 139.06
  } else if (pozaMiejscemZam == "pracaW" && dzielo == false) {
    kup = 111.25;
  } else if (pozaMiejscemZam == "pracaPoza" && dzielo == true) {
    var bruttoKup = brutto - (brutto / 30) * numerOfDays;
    if (bruttoKup < 0) {
      bruttoKup = 0
    } else {
      console.log("Mniej niż 30 dni wolnych");
    };
    kup = (bruttoKup * 0.5 * (1 - 0.1371) * dzieloPercent / 100) + 139.06;
  } else if (pozaMiejscemZam == "pracaW" && dzielo == true) {
    var bruttoKup = brutto - (brutto / 30) * numerOfDays;
    if (bruttoKup < 0) {
      bruttoKup = 0
    } else {
      console.log("Mniej niż 30 dni wolnych");
    };
    kup = (bruttoKup * 0.5 * (1 - 0.1371) * dzieloPercent / 100) + 111.25;
  } else {
    console.log("WTF!!!");
  };

  console.log("kup = " + kup);
  console.log("Brutto po odliczeniu wolnego = " + bruttoKup)

  // SKLADKI:
  var emerytalna = Math.round(wynagrodzZaDniPrzepracowane * 0.0976 * 100) / 100;
  console.log("emerytalna = " + emerytalna);

  var rentowa = Math.round(wynagrodzZaDniPrzepracowane * 0.015 * 100) / 100;
  console.log("rentowa = " + rentowa);

  var chorobowa = Math.round(wynagrodzZaDniPrzepracowane * 0.0245 * 100) / 100;
  console.log("chorobowa = " + chorobowa);

  var sklSpoleczna = emerytalna + rentowa + chorobowa;
  console.log("Składki społeczne = " + sklSpoleczna);

  var skladkaZdrowotna = Math.round((wynagrodzZaDniPrzepracowane + zasilekChorobowy - sklSpoleczna) * 0.09 * 100) / 100;
  console.log("Składka zdrowotna = " + skladkaZdrowotna);

  var skladkaZdrowotnaOdl = ((wynagrodzZaDniPrzepracowane + zasilekChorobowy - sklSpoleczna) * 0.0775).toFixed(2);
  console.log("Składka zdrowotna odliczana od podatku = " + skladkaZdrowotnaOdl);


  // OPODATKOWANIE:
  var podstawaOpodatkowania = Math.round(wynagrodzZaDniPrzepracowane + zasilekChorobowy - kup - sklSpoleczna);
  if (podstawaOpodatkowania < 0) {
    podstawaOpodatkowania = 0
  }
  console.log("podstawaOpodatkowania = " + podstawaOpodatkowania);


  if (wynagrodzZaDniPrzepracowane >= 85528) {
    var podatek = 15395.04 + ((Math.round(podstawaOpodatkowania) - 85528) * 0.32)
  } else {
    var podatek = Math.round(podstawaOpodatkowania) * 0.18
  };
  console.log("Podatek = " + podatek)


  var kwotaWolnaOdPodatku = 46.33;
  var zaliczkaNaPodatekDochodowy = Math.round((podatek - kwotaWolnaOdPodatku - skladkaZdrowotnaOdl));

  if (zaliczkaNaPodatekDochodowy < 0) {
    zaliczkaNaPodatekDochodowy = 0
  }
  console.log("Zaliczka na podatek dochodowy = " + zaliczkaNaPodatekDochodowy);

  // DO WYPLATY:
  console.log("Wynagrodznie z dni przepr" + wynagrodzZaDniPrzepracowane);
  console.log("Zasiłek chorobowy" + zasilekChorobowy);
  console.log("Składka połecz" + sklSpoleczna);
  console.log("SKładka zdr" + skladkaZdrowotna);
  console.log("Zaliczka na podat" + zaliczkaNaPodatekDochodowy)

  var netto = (wynagrodzZaDniPrzepracowane + zasilekChorobowy - sklSpoleczna - skladkaZdrowotna - zaliczkaNaPodatekDochodowy).toFixed(2);
  console.log("do wypł" + netto)


  // SKŁADKI PRACODAWCY
  var skladkaEmerytalnaPrac = (wynagrodzZaDniPrzepracowane * 0.0976);
  var skladkaRentowaPrac = (wynagrodzZaDniPrzepracowane * 0.065);
  var skladkaWypadkowa = (wynagrodzZaDniPrzepracowane * (sklWypProc) / 100);
  var funduszPracy = (brutto * 0.0245);
  var fgsp = (brutto * 0.001);
  var kosztPracodawcy = skladkaEmerytalnaPrac + skladkaRentowaPrac + skladkaWypadkowa + funduszPracy + fgsp;
  console.log("Koszt pracodawcy = " + kosztPracodawcy)

  console.log("****************************************************************");
  // Outputting the data:


  document.querySelector("#emerytalna").innerHTML = "emerytalna: " + emerytalna.toFixed(2) + " zł";
  document.querySelector("#rentowa").innerHTML = "rentowa: " + rentowa.toFixed(2) + " zł";
  document.querySelector("#chorobowa").innerHTML = "chorobowa: " + chorobowa.toFixed(2) + " zł";
  document.querySelector("#kup").innerHTML = "KUP: " + kup.toFixed(2) + " zł";
  document.querySelector("#podatek").innerHTML = "Podatek: " + zaliczkaNaPodatekDochodowy.toFixed(2) + " zł";
  document.querySelector("#zdrowotna").innerHTML = "Składka zdrowotna: " + skladkaZdrowotna + " zł";
  document.querySelector("#zasilekChorobowy").innerHTML = "Zasiłek chorobowy: " + zasilekChorobowy.toFixed(2) + " zł";
  document.querySelector("#netto").innerHTML = "Do wypłaty: <strong> " + netto + "</strong> zł";
  document.querySelector("#zdrOdl").innerHTML = "Składka zdrowotna odliczana od podatku: " + skladkaZdrowotnaOdl + " zł";
  document.querySelector("#podstawaOp").innerHTML = "Podstawa opodatkowania: " + podstawaOpodatkowania + " zł";
  document.querySelector("#sklEmPr").innerHTML = "emerytalna: " + skladkaEmerytalnaPrac.toFixed(2) + " zł";
  document.querySelector("#sklRenPr").innerHTML = "rentowa: " + skladkaRentowaPrac.toFixed(2) + " zł";
  document.querySelector("#wypadkowa").innerHTML = "wypadkowa: " + skladkaWypadkowa.toFixed(2) + " zł";
  document.querySelector("#funPr").innerHTML = "Fundusz Pracy: " + funduszPracy.toFixed(2) + " zł";
  document.querySelector("#fgsp").innerHTML = "FGŚP: " + fgsp.toFixed(2) + " zł";
  document.querySelector("#razSkPr").innerHTML = "Razem składki pracodawcy: " + kosztPracodawcy.toFixed(2) + " zł";

}