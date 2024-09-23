
# PokeApi-Ixpandit

Pagina de consumo de servicio de https://pokeapi.co/

En esta pagina listamos todos los pokemones,
con un paginado y un leve detalle de cada pokemon. 

## Probar la pagina
esta pagina esta dockerizada por lo cual vamos a levantar corriendo los siguientes comandos:

```bash
docker build -t pokeapp-vite .
```

y luego levantamos el contenedor con el siguiente comando:

```bash
docker run -p 3000:80 pokeapp-vite
```

y listo deberiamos poder ver la pagina en el siguiente link:

- [PokeApi-localhost](http://localhost:3000/)

### Espero que les guste y muchas gracias por la oportunidad

## Author

- [@miguelescalera](https://www.github.com/miguelescalera)
