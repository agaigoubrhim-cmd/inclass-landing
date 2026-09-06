"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen items-center justify-center bg-[#FAF8F5] p-6 text-[#1E1B18] font-sans antialiased">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <AlertTriangle className="h-8 w-8" />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-[#1E1B18]">
            Erreur critique du système
          </h1>

          <p className="mt-2 text-sm text-[#6B645C]">
            Une anomalie inattendue a empêché l&apos;affichage de la structure principale.
          </p>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => reset()}
              className="btn-duo inline-flex h-11 items-center gap-2 rounded-2xl px-6 text-sm font-extrabold"
            >
              <RefreshCw className="h-4 w-4" />
              Recharger l&apos;application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
