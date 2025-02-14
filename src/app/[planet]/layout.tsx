import { Metadata } from "next";
import { Planet } from "../types";

import data from "../data.json";

interface PlanetLayoutProps {
  params: Promise<{
    planet: string;
  }>;
  children: React.ReactNode;
}

export async function generateStaticParams() {
  return data.map((planet: Planet) => ({
    planet: planet.name,
  }));
}

export async function generateMetadata(
  props: PlanetLayoutProps
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

export default function PlanetLayout({ children }: PlanetLayoutProps) {
  return <>{children}</>;
}
