import { getConfiguracion } from "@/lib/supabase/queries";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import ContactSection from "@/components/public/ContactSection";

export const revalidate = 60;

export default async function ContactoPage() {
  const config = await getConfiguracion();

  return (
    <>
      <Navbar logoUrl={config?.logo_url} nombreInstitucion={config?.nombre_institucion} />
      <main>
        <section className="bg-institucional-azul py-12 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Contacto</h1>
            <p className="text-blue-100">Comunícate con nosotros</p>
          </div>
        </section>
        <ContactSection config={config} />
      </main>
      <Footer config={config} />
    </>
  );
}
