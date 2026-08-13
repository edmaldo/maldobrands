import { createClient } from "@/lib/supabase/server";

export default async function TestSupabase() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("outfits").select("*");

  return (
    <main className="p-10">
      <h1 className="mb-6 text-3xl font-bold">Supabase Test</h1>

      {error ? (
        <pre className="text-red-500">{JSON.stringify(error, null, 2)}</pre>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </main>
  );
}
