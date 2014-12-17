	$(document).ready(function() {
	var popup = L.popup();
	var zabytki=[];
	var markery=[];
	var baza  = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});
	var budynki = new L.tileLayer.wms('http://mapy.geoportal.gov.pl/wss/service/pub/guest/G2_BDOT_BUD_2010/MapServer/WMSServer', {
		format: 'img/png',
		transparent: true,
		layers: '5',
		});
	var ulice = new L.tileLayer.wms('http://mapy.geoportal.gov.pl/wss/service/PZGIKINSP/guest/services/G2_EMUIA_WMS/MapServer/WMSServer', {
		format: 'img/png',
		transparent: true,
		layers: 'UliceL',
		});
	var map = L.map('map', {
		center: [50.4446, 18.8586],
		zoom: 13,
		layers: [baza]
	});	
	var orto   = new L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer",
	{ format:"image/png",
	transparent:true,
	layers:"Raster"});
	var adm   = new L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/img/guest/TOPO/MapServer/WMSServer",
	{ format:"image/png",
	transparent:true,
	layers:"Raster"});
	var baseLayers = {
		"Mapa": baza,
		"Ortofoto": orto,
		"Raster": adm
	};
	var overlays = {
		"Budynki": budynki,
		"Ulice": ulice
	};
L.control.layers(baseLayers, overlays).addTo(map);
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);	
$('#marker').click(function(e) {
function onMapClick(e) {

    var geojsonFeature = {
        "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [e.latlng.lat, e.latlng.lng]
        }
    };
    var marker;
    L.geoJson(geojsonFeature, {       
        pointToLayer: function(feature, latlng){
            
            marker = L.marker(e.latlng, {
                
                title: "Resource Location",
                alt: "Resource Location",
                riseOnHover: true,
                draggable: true,

            }).bindPopup("<input type='button' value='Usuń znacznik' class='marker-delete-button'/>");

            marker.on("popupopen", onPopupOpen);
       
            return marker;
        }
    }).addTo(map);
    markery.push(marker);
}
function onPopupOpen() {

    var tempMarker = this;
    $(".marker-delete-button:visible").click(function () {
        map.removeLayer(tempMarker);
    });
   }
   map.on('click', onMapClick);
    e.preventDefault();
});
$("#usun").on("click", function(e) { 
	for (var i=0;i<markery.length;i++) {
		map.removeLayer(markery[i]);
} 
	e.preventDefault();
	});
var meta1nJson={
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.849769,
          50.425535
        ]
      },
      "properties": {
        "nazwa": "Zabytkowa kopalnia srebra",
        "adres": "ul. Szczęść Boże 81 ",
        "Opis": "Jedyna w Polsce podziemna trasa turystyczna udostępniająca zwiedzanie podziemi po dawnych kopalniach kruszców srebronośnych"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.799836,
          50.429982
        ]
      },
        "properties": {
        "nazwa": "Sztolnia czarnego pstrąga",
        "adres": "park repecki ",
        "Opis": "Jest 600 metrowym fragmentem najdłuższej sztolni odwadniającej Fryderyk (w późniejszym okresie nazwa Kościuszko). Można ją zwiedzać od 1957 r., dzięki staraniom Stowarzyszenia Miłośników Ziemi Tarnogórskiej. Trasa turystyczna znajduje się pomiędzy szybami Ewa i Sylwester."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.854694,
          50.444300
        ]
      },
      "properties": {
        "nazwa": "Dom Sedlaczka",
        "adres": "ul. Rynek 1 ",
        "Opis": "Wybudowany w XVI w. był do XIX w. siedzibą starostwa ziemi bytomskiej. W 1805 r. kupił go Jan Sedlaczek i urządził w nim winiarnię, która istnieje do dziś. Obecnie na piętrze mieści się Muzeum założone w 1958 roku z przepięknym wystrojem i stropem z polichromią z I połowy XVII w. Muzeum gromadzi przedmioty związane z historią, sztuką, górnictwem kruszcowym i etnografią okręgu tarnogórskiego. We wnętrzach organizuje się m.in. koncerty i Wieczory pod renesansowym stropem z wybitnymi tarnogórzanami związanymi z nauką, kulturą i sztuką. "
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.855485,
          50.444167
        ]
      },
      "properties": {
        "nazwa": "Ratusz",
        "adres": "ul. Rynek 4 ",
        "Opis": "Wzniesiony w latach 1896-1898 w stylu neorenesansu północnego z elementami gotyku. Dach wieńczy drewniana wieżyczka, a elewację zdobią wykute w piaskowcu herby: rodziny Henckel von Donnersmarck, królestwa pruskiego, cesarstwa niemieckiego, prowincji śląskiej, trójpolowy miejski nadany w 1562 r., margrabiowski Jerzego Hohenzollerna. Na fasadzie umieszczona jest postać gwarka tarnogórskiego, pochodząca z 1959 r. "
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.855563,
          50.444843
        ]
      },
      "properties": {
        "nazwa": "Kościół ewangelicko-augsburski",
        "adres": "ul. Rynek 12 ",
        "Opis": "Wybudowany przez gminę ewangelicką w 1780 r. dzięki wsparciu finansowemu Hencklów, Laryszów, Grustów, Bohmów oraz Schulzów. Budowniczymi świątyni byli architekt Krzysztof Worbs ze Strzelec oraz cieśla Jan Karol Henning z Opola. Kościół posiadał wieżę, na której w 1787 r. umieszczono zegar wykonany przez Franciszka Schmachela, zegarmistrza z Brynicy. W 1900 r. przebudowano go w stylu neoromańskim. Wewnątrz znajdują się charakterystyczne dla świątyń protestanckich empory."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.852709,
          50.443547
        ]
      },
      "properties": {
        "nazwa": "Dzwonnica gwarków",
        "adres": "ul. Szczęść Boże 81 ",
        "Opis": "Początki tarnogórskiej dzwonnicy sięgają już XVI w. Późniejszą z XIX w. przeniesiono na plac Gwarków w 1955 r. dzięki inicjatywie Stowarzyszenia Miłośników Historii i Zabytków Ziemi Tarnogórskiej z kamieniołomu w Bobrownikach Śląskich. Ustawiono ją na miejscu dawnego domu zbornego gwarków. Wykonana w całości z drewna stoi na podmurowaniu z kamienia wapiennego. Pod namiotowym dachem, który pokryty jest gontem, umieszczono dzwonek szychtowy."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.853370,
          50.443198
        ]
      },
      "properties": {
        "nazwa": "Kościół parafialny p.w. św. Apostołów Piotra i Pawła",
        "adres": "ul. Szczęść Boże 81 ",
        "Opis": "Jedyna w Polsce podziemna trasa turystyczna udostępniająca zwiedzanie podziemi po dawnych kopalniach kruszców srebronośnych"
      }
    },
        {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.838399,
          50.429809
        ]
      },
      "properties": {
        "nazwa": "Kościół p.w. św. Anny",
        "adres": "ul. Szczęść Boże 81 ",
        "Opis": "Wzniesiony przez protestantów w latach 1617 - 1619 jako przycmentarna świątynia. Wybudowany dzięki fundacji Jakuba Gruzełki i pani Goske. Na cześć głównego darczyńcy, który ofiarował na rzecz powstającego kościoła 700 talarów, na patrona wybrano mu św. Jakuba. W 1629 r. odebrany został protestantom przez katolików, prawdopodobnie w drugiej połowie XVII w. przemianowany na świątynię p.w. św. Anny. Gruntownie przebudowano go w latach 1846 - 1847. W późnobarokowym ołtarzu z końca XVIII w. umieszczono obraz Nauczanie Matki Boskiej. "
      }
    },
        {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          50.4442,
          18.8586
        ]
      },
      "properties": {
        "nazwa": "Kościół parafialny p.w. św. Apostołów Piotra i Pawła",
        "adres": "ul. Szczęść Boże 81 ",
        "Opis": "Jedyna w Polsce podziemna trasa turystyczna udostępniająca zwiedzanie podziemi po dawnych kopalniach kruszców srebronośnych"
      }
    }
  ]
};
$('#zabytki').click(function(e) {
var zabytki1=L.geoJson(meta1nJson, {
    style: function (feature) {
        return {color: feature.properties.color};
    },
    onEachFeature: function (feature, layer) {
    	var popupContent = "<b>Nazwa : </b>" +feature.properties.nazwa + "<br><b>Adres : </b>"+feature.properties.adres +"<br><b>Opis : </b>"+ feature.properties.Opis;
        layer.bindPopup(popupContent);
    }
}).addTo(map);
zabytki.push(zabytki1);
e.preventDefault();
});
$("#usunz").on("click", function(e) { 
	for (var i=0;i<zabytki.length;i++) {
		map.removeLayer(zabytki[i]);
} 
	e.preventDefault();
	});
$("#usun").on("click", function(e) { 
	for (var i=0;i<markery.length;i++) {
		map.removeLayer(markery[i]);
} 
	e.preventDefault();
	});
$('#start').click(function(e) {
window.refresh();
});
});