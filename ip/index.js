//axios import buraya gelecek
import axios from "axios";

var benimIP;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
		.then(function (response) {
			return response.data
		})
		.then(function (a) {
			benimIP = a
		});
}
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
	(tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
	https://apis.ergineer.com/ipgeoapi/<ipniz>

	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/
function getIpLocationData(ip) {
	axios
		.get("https://apis.ergineer.com/ipgeoapi/31.223.3.10")
		.then((res) => {
			console.log(res.data);
			cardYapici(res.data);

		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => { });
}
getIpLocationData()


/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.

*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
	DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	NOT: API'den gelen bayrak url'i çalışmazsa alternatif olarak: https://flagsapi.com/
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
	</div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve
	bu kartı DOM olarak .cards elementinin içine ekleyin.
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün.
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine
	bilgisayarınızın IP adresini atayacaktır.
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP;
*/



//kodlar buraya gelecek

const staticIpLocationData = {
	as: "AS12735 TurkNet Iletisim Hizmetleri A.S.",
	boylam: 27.1417,
	bölge: "35",
	bölgeAdı: "İzmir Province",
	durum: "OK",
	enlem: 38.425,
	isp: "TurkNet Iletisim Hizmetleri A.S.",
	kıta: "Asia",
	organizasyon: "Diva POP Dynamic",
	parabirimi: "TRY",
	saatdilimi: "Europe/Istanbul",
	sorgu: "31.223.3.10",
	zip: "35230",
	ülke: "Türkiye",
	ülkeKodu: "TR",
	ülkebayrağı: "https://apis.ergineer.com/ulkebayraklari/TR",
	şehir: "Izmir"
}

const cardYapici = (data) => {
	const card = `<div class="card">
<img src="https://flagcdn.com/w320/${data["ülkeKodu"].toLowerCase()}.png" />
<div class="card-info">
	<h3 class="ip">${data["sorgu"]}</h3>
	<p class="ulke">${data["ülkeKodu"]}</p>
	<p>Enlem: ${data["enlem"]} Boylam: ${data["boylam"]}</p>
	<p>Şehir: ${data["şehir"]}</p>
	<p>Saat dilimi: ${data["saatdilimi"]}</p>
	<p>Para birimi: ${data["parabirimi"]}</p>
	<p>ISP: ${data["isp"]}</p>
</div>
</div>`;

	document.querySelector(".cards").innerHTML = card;
	return card

}

async function runApp() {
	await ipAdresimiAl();
	getIpLocationData(benimIP);
}
runApp();


































/*
const contents = document.querySelector(".contents"); // Değişiklik: contents adını kullanın

const contentArea = (data) => {
	const content = document.createElement("div");
	content.classList.add("card");
	document.body.append(content);

	const flag = document.createElement("img");
	flag.src = `https://flagcdn.com/w320/${data.ülkeKodu.toLowerCase()}.png`;
	content.append(flag);

	const cardInfo = document.createElement("div");
	cardInfo.classList.add("card-info");
	content.appendChild(cardInfo);

	const ipAdres = document.createElement("h3");
	ipAdres.classList.add("ip");
	ipAdres.textContent = data.sorgu;
	cardInfo.appendChild(ipAdres);

	const country = document.createElement("p");
	country.classList.add("ülke");
	country.textContent = data.ülkeKodu;
	cardInfo.appendChild(country);

	const enlem = document.createElement("p");
	enlem.textContent = `Enlem: ${data.enlem} Boylam: ${data.boylam}`; // Değişiklik: backtick içinde düzgün string
	cardInfo.appendChild(enlem);

	const city = document.createElement("p");
	city.textContent = data.şehir;
	cardInfo.appendChild(city);

	const clock = document.createElement("p");
	clock.textContent = data.saatdilimi;
	cardInfo.appendChild(clock);

	const parabirimi = document.createElement("p");
	parabirimi.textContent = data.parabirimi;
	cardInfo.appendChild(parabirimi);

	const isp = document.createElement("p");
	isp.textContent = data.isp;
	cardInfo.appendChild(isp);

	return content;
};

console.log(contentArea)


/*async function ipAdresimiAl() {
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
		.then(function (response) {
			return response.data
		})
		.then(function (a) {
			benimIP = a
		});
}*/









