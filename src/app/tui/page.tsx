import ClientImageCropper from '../components/test';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">画像トリミング</h1>
      <ClientImageCropper />
    </main>
  );
}