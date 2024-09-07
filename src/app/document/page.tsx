import ListDocument from "@/components/ListDocument";
import { Suspense } from "react";

export default function Document() {
  return (
    <main>
      <Suspense>
        <ListDocument />
      </Suspense>
    </main>
  );
}
