interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-semibold">{slug}</h1>
      <p>Brand page coming soon.</p>
    </main>
  );
}
