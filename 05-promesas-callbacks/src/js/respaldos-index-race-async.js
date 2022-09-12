import './styles.css';

import { promesaLenta, promesaMedia, promesaRapida } from './js/promesas';
import { buscarHeroeAsync, buscarHeroe } from './js/promesas';

promesaLenta.then(console.log);
promesaMedia.then((mensaje) => console.log(mensaje));
promesaRapida.then(console.log);

Promise.race([promesaLenta, promesaMedia, promesaRapida]).then(console.log);

buscarHeroe('capi')
	.then((heroes) => console.log(heroes))
	.catch((err) => console.log(err));

buscarHeroeAsync('iron')
	.then((heroes) => console.log(heroes))
	.catch((err) => console.log(err));
