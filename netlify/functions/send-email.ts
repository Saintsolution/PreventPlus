import { Resend } from 'resend';

// Isso diz ao TypeScript para ignorar a falta de definição global do process
declare var process: {
  env: {
    RESEND_API_KEY: string;
  };
};

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Método não permitido' }) 
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { nome, email, whatsapp, idades, refId } = body;

    const { data, error } = await resend.emails.send({
      from: 'Site Prevent <vendas@preventplus.com.br>',
      to: 'adesaodigital@gmail.com',
      subject: `NOVA COTAÇÃO - ${nome.toUpperCase()}`,
      html: `
        <div style="font-family: sans-serif; color: #0A2540;">
          <h2 style="color: #D4AF37;">Novo Lead Recebido</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp}</p>
          <p><strong>Idades:</strong> ${idades}</p>
          <hr />
          <p style="font-size: 10px; color: #666;">ID de Referência: ${refId || 'Direto'}</p>
        </div>
      `,
    });

    if (error) {
      return { statusCode: 500, body: JSON.stringify(error) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'E-mail enviado!', id: data?.id }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Falha ao processar requisição', details: err.message }),
    };
  }
};