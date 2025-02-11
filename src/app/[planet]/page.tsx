import { Planet } from "../types";
import data from "../data.json";
import { redirect } from "next/navigation";

interface PlanetPageProps {
  params: Promise<{
    planet: string;
  }>;
}

export async function generateStaticParams() {
  return data.map((planet: Planet) => ({
    planet: planet.name.toLowerCase(),
  }));
}

export default async function PlanetPage(props: PlanetPageProps) {
  const params = await props.params;
  const planet = data.find(
    (p: Planet) => p.name.toLowerCase() === params.planet
  );

  if (!planet) {
    redirect("/earth");
  }

  return (
    <main>
      <h1>{planet.name}</h1>
    </main>
  );
}
