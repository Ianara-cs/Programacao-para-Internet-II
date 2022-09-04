import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, code: number) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "8bc60cea84bad5",
            pass: "e48d9047ec0d3f"
        },
      });
  
      const options = () => {
        return {
          from: 'ianarasilva333@gmail.com',
          to: email,
          subject: 'Validação de email',
          html: `<p>Código de validação ${code}<p>`
        };
      };
  
      transporter.sendMail(options(), (error, info) => {
        if (error) {
          return error;
        } else {
          return 'Email enviado com sucesso!'
        }
      });
    } catch (error) {
      return error;
    }
  };
  