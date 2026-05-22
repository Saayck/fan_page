import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { nombre, correo, asunto, mensaje } = await req.json();

  if (!nombre || !correo || !asunto || !mensaje) {
    return NextResponse.json({ error: "Todos los campos son requeridos." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${nombre}" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: correo,
      subject: `[Contacto Web] ${asunto}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 8px;">
            Nuevo mensaje de contacto
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #374151; width: 140px;">Nombre:</td>
              <td style="padding: 8px; color: #4b5563;">${nombre}</td>
            </tr>
            <tr style="background-color: #f9fafb;">
              <td style="padding: 8px; font-weight: bold; color: #374151;">Correo:</td>
              <td style="padding: 8px;">
                <a href="mailto:${correo}" style="color: #1e40af;">${correo}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #374151;">Asunto:</td>
              <td style="padding: 8px; color: #4b5563;">${asunto}</td>
            </tr>
          </table>
          <div style="margin-top: 16px;">
            <p style="font-weight: bold; color: #374151; margin-bottom: 8px;">Mensaje:</p>
            <div style="background-color: #f9fafb; border-left: 4px solid #1e40af; padding: 16px; color: #4b5563; white-space: pre-wrap;">
              ${mensaje}
            </div>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
            Este mensaje fue enviado desde el formulario de contacto del sitio web.
            Para responder, usa el botón "Responder" — el correo irá directamente a ${correo}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error enviando correo:", error);
    return NextResponse.json({ error: "No se pudo enviar el mensaje. Inténtalo más tarde." }, { status: 500 });
  }
}
