import { NextPage, GetStaticProps } from 'next';
import { Card, Grid, Row, Text } from '@nextui-org/react';

import { pokeApi } from '../api';
import { Layout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokemons">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  // const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
  //   ...poke,
  //   id: i + 1,
  //   img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
  // }));

  const pokemons: SmallPokemon[] = data.results.map((item) => {
    const idRegEx = item.url.match(/\/\d+\//g);
    const id = idRegEx![0].replace(/\//g, '');
    item.id = Number(id);
    item.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    return item;
  });

  return {
    props: {
      pokemons: pokemons,
    },
  };
};

export default HomePage;
