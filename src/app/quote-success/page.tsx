import Link from "next/link";

export default function QuoteSuccess() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">C'est déjà fini !</h1>
        <p className="mb-4 text-base md:text-lg">
          Merci d'avoir rempli notre formulaire de demande de devis. Votre satisfaction est notre priorité et nous sommes ravis de pouvoir vous aider à concrétiser votre projet.
        </p>
        <p className="mb-4 text-base md:text-lg">
          Nous avons bien reçu vos informations et notre équipe va les analyser avec attention. Vous serez contacté sous peu pour discuter des détails supplémentaires et vous fournir un devis personnalisé.
        </p>
        <p className="mb-8 text-base md:text-lg">
          En attendant, n'hésitez pas à nous contacter pour toute question ou information complémentaire.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-none bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-900"
          >
            Retourner à l'accueil
          </Link>
          <Link
            href="#quickquote"
            className="inline-flex items-center justify-center rounded-none bg-gray-100 px-6 py-3 text-sm font-semibold text-black hover:bg-gray-200"
          >
            Revenir au formulaire
          </Link>
        </div>
      </div>
    </main>
  );
}
