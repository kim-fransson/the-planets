import { Planet } from "../types";
import data from "../data.json";
import { redirect } from "next/navigation";
import { Metadata } from "next";

interface PlanetPageProps {
  params: Promise<{
    planet: string;
  }>;
}

export async function generateStaticParams() {
  return data.map((planet: Planet) => ({
    planet: planet.name,
  }));
}

export async function generateMetadata(
  props: PlanetPageProps
): Promise<Metadata> {
  const params = await props.params;
  const planet = data.find((p: Planet) => p.name === params.planet);

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

export default async function PlanetPage(props: PlanetPageProps) {
  const params = await props.params;
  const planet = data.find((p: Planet) => p.name === params.planet);

  if (!planet) {
    redirect("/earth");
  }

  return <main></main>;
}
