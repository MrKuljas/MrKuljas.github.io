//FORMIRAJ = funkcija koja formira niz od devet objekata, gde svaki objekat ima tri osobine: id dugmeta(indeks), broj koji pise na dugmetu i boju samog dugmeta
// SHUFFLE = funkcija koja mesa niz

var brojac = 0;

var sve = ["1#008CBA", "1#4CAF50", "1#f44336","2#008CBA", "2#4CAF50", "2#f44336","3#008CBA", "3#4CAF50", "3#f44336"];

var f1=[];
for (i=0;i<10;i++){
        f1.push(Math.floor((Math.random() * 3) + 1).toString());
    }

var f2=[];
for (i=0; i<10;i++){
    f2.push(['#008CBA','#4CAF50','#f44336'][Math.floor((Math.random() * 3))]);
}


var formule = [f1[0], "<font color='"+f2[0]+"'> &#9632 </font>", "<font color='"+f2[1]+"'>&#9632</font>"+"  i "+f1[1], "<font color='"+f2[2]+"'>&#9632</font>"+" ili "+f1[2], "NE "+"<font color='"+f2[3]+"'>&#9632</font>"+" i "+f1[3],  "NE "+f1[4]+" ili "+"<font color='"+f2[4]+"'>&#9632</font>", ];

var resenja = [[f1[0]+"#008CBA", f1[0]+"#4CAF50", f1[0]+"#f44336"], ["1"+f2[0], "2"+f2[0], "3"+f2[0]], [f1[1]+f2[1]], [f1[2]+"#008CBA", f1[2]+"#4CAF50", f1[2]+"#f44336","1"+f2[2], "2"+f2[2], "3"+f2[2]],[f1[3]+"#008CBA", f1[3]+"#4CAF50", f1[3]+"#f44336"].filter(l => (l.slice(1,8))!= f2[3]), sve.filter(l =>(l[0]!=f1[4])|| (l.slice(1,8)==f2[4]))];

var duzina=[3,3,1,5,2,7,];
var vreme=[5,5,5,4,4,3];

var stanje;

var bod = 0;
    
function promesaj(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}   


function odbroj(d){
	var prom=setInterval(tajmer, 1000);
	function tajmer() {
  		if (d==0){
  			document.getElementById("demo").innerHTML =d;
  			clearInterval(prom);
 		}
 		else{
  			document.getElementById("demo").innerHTML =d;
  			d=d-1;
  		}
  	}
}



function formiraj() {
    let niz = [];
    function dodaj(indeks, broj,boja) {
        niz.push({indeks, broj,boja});
    }
    let brojeviBoje=promesaj(sve);
    let brojevi = [];
    let boje= [];
    brojeviBoje.forEach(x => brojevi.push(x.split("#")[0]));
    brojeviBoje.forEach(x => boje.push("#"+x.split("#")[1]));
    let indeksi = ['11','12','13','21','22','23','31','32','33'];
    for(let i = 0; i < 9; i++){
        dodaj(indeksi[i],brojevi[i],boje[i]);
    }
    return niz;
}    

function nivo(brojac){
    stanje = formiraj();
    ispisi(stanje);
    document.getElementById("zadavanje").innerHTML=formule[brojac];
}

    

//ISPISI = funkcija koja iscrtava niz dugmadi koji je napravljen sa funkcijom formiraj
function ispisi(niz){ 
    for(let i = 0; i < 9; i++){
        document.getElementById(niz[i].indeks).disabled=false;
        document.getElementById(niz[i].indeks).style.color="white";
        document.getElementById(niz[i].indeks).style.border="3px solid white";
        document.getElementById(niz[i].indeks).style.background=niz[i].boja;
        document.getElementById(niz[i].indeks).innerHTML=niz[i].broj;
        
    }
}

    
function ispisiResenje(brojac){
    for(let i=0; i<9; i++){
        if (resenja[brojac].includes(stanje[i].broj.concat(stanje[i].boja))){
            document.getElementById(stanje[i].indeks).style.background="white";
            document.getElementById(stanje[i].indeks).style.border="3px solid "+stanje[i].boja;
            document.getElementById(stanje[i].indeks).style.color=stanje[i].boja;
        }
        else{
            document.getElementById(stanje[i].indeks).style.background="gray";
        }
    }
}
    
    
function provera(i){
        if (resenja[brojac].includes(stanje[i].broj.concat(stanje[i].boja))){
            document.getElementById(stanje[i].indeks).style.background="white";
            document.getElementById(stanje[i].indeks).style.border="3px solid "+stanje[i].boja;
            document.getElementById(stanje[i].indeks).style.color=stanje[i].boja;
            document.getElementById(stanje[i].indeks).disabled=true;
            bod=bod+1;
            if (bod==duzina[brojac]){
                bod=0;
                brojac=brojac+1;
                nivo(brojac);
                }
        }    
        else{
            document.getElementById("ispis").innerHTML="IZGUBIO SI";
            ispisiResenje(brojac);
        }
}
