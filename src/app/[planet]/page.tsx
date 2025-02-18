import { Metadata } from "next";
import { Planet as PlanetType } from "../types";
import Planet from "./Planet";

import data from "../data.json";
import { redirect } from "next/navigation";

interface PlanetPageProps {
  params: Promise<{
    planet: string;
  }>;
  children: React.ReactNode;
}

export async function generateStaticParams() {
  return data.map((planet: PlanetType) => ({
    planet: planet.name,
  }));
}

export async function generateMetadata(
  props: PlanetPageProps
): Promise<Metadata> {
  const params = await props.params;
  const planet = data.find((p: PlanetType) => p.name === params.planet);

  return {
    title: planet!.name,
    description: planet!.overview.content,
    icons: {
      icon: [
        {
          url: `/favicons/${planet!.name}.png`,
          sizes: "32x32",
          type: "image/png",
        },
      ],
    },
  };
}

export default async function PlanetLayout(props: PlanetPageProps) {
  const params = await props.params;
  const planet = data.find((p: PlanetType) => p.name === params.planet);

  if (!planet) {
    redirect("/earth");
  }

  return <Planet planet={planet} />;
}
