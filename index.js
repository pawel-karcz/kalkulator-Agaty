// ****Enabling & disabling  section****

var autorskie = document.querySelector("input[name=autorskie]");

autorskie.addEventListener('change', function() {
  if (this.checked) {
    document.querySelector("input[name=udzial]").removeAttribute("disabled");
    document.querySelector("input[name=dniWolne]").removeAttribute("disabled");
    console.log("Checked");

  } else {
    document.querySelector("input[name=udzial]").setAttribute("disabled", "disabled");
    document.querySelector("input[name=dniWolne]").setAttribute("disabled", "disabled");
    console.log("Unchecked");

  }
})


// ****Listeners***
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

  console.log(brutto);
  console.log("Wybrana opcja miejsca: " + pozaMiejscemZam);
  console.log("Wybrana opcja dzieła: " + dzielo);
  console.log("Wpisana wartość %: " + dzieloPercent);
  console.log("Wolne dni: " + numerOfDays);


  //Operations:
  // var pozaMiejscemZam = radio;
  // console.log(pozaMiejscemZam);
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
    kup = (bruttoKup * 0.5 * (1 - 0.1371) * dzieloPercent/100) + 139.06;
  } else if (pozaMiejscemZam == "pracaW" && dzielo == true) {
    var bruttoKup = brutto - (brutto / 30) * numerOfDays;
    if (bruttoKup < 0) {
      bruttoKup = 0
    } else {
      console.log("Mniej niż 30 dni wolnych");
    };
    kup = (bruttoKup * 0.5 * (1 - 0.1371) * dzieloPercent/100) + 111.25;
  } else {
    console.log("WTF!!!");
  };

  console.log("kup = " + kup);
  console.log("Brutto po odliczeniu wolnego = " + bruttoKup)

  // SKLADKI:
  var emerytalna = brutto * 0.0976;
  console.log("emerytalna = " + emerytalna);

  var rentowa = brutto * 0.015;
  console.log("rentowa = " + rentowa);

  var chorobowa = brutto * 0.0245;
  console.log("chorobowa = " + chorobowa);

  var sklSpoleczna = emerytalna + rentowa + chorobowa;
  console.log("Składki społeczne = " + sklSpoleczna);

  var skladkaZdrowotna = ((brutto - sklSpoleczna) * 0.09).toFixed(2);
  console.log("Składka zdrowotna = " + skladkaZdrowotna);

  var skladkaZdrowotnaOdl = ((brutto - sklSpoleczna) * 0.0775).toFixed(2);
  console.log("Składka zdrowotna odliczana od podatku = " + skladkaZdrowotnaOdl);


  // OPODATKOWANIE:
  var podstawaOpodatkowania = Math.round(brutto - kup - sklSpoleczna);
  if (podstawaOpodatkowania < 0) {
    podstawaOpodatkowania = 0
  }
  console.log("podstawaOpodatkowania = " + podstawaOpodatkowania);


  if (brutto >= 85528) {
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
  var netto = (brutto - sklSpoleczna - skladkaZdrowotna - zaliczkaNaPodatekDochodowy).toFixed(2);


  console.log("****************************************************************");
  // Outputting the data:


  document.querySelector("#emerytalna").innerHTML = "emerytalna: " + emerytalna.toFixed(2) + " zł";
  document.querySelector("#rentowa").innerHTML = "rentowa: " + rentowa.toFixed(2) + " zł";
  document.querySelector("#chorobowa").innerHTML = "chorobowa: " + chorobowa.toFixed(2) + " zł";
  document.querySelector("#kup").innerHTML = "KUP: " + kup.toFixed(2) + " zł";
  document.querySelector("#podatek").innerHTML = "Podatek: " + zaliczkaNaPodatekDochodowy.toFixed(2) + " zł";
  document.querySelector("#zdrowotna").innerHTML = "Składka zdrowotna: " + skladkaZdrowotna + " zł";
  document.querySelector("#netto").innerHTML = "Do wypłaty: <strong> " + netto + "</strong> zł";
}
