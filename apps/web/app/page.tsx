import { prismaClient } from "db";
import type { JSX } from "react";

export default async function Home(): Promise<JSX.Element> {
  const users = await prismaClient.user.findMany();

  return (
    <div>
      {JSON.stringify(users)}
    </div>
  );
}
