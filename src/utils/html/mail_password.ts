import { Injectable } from '@nestjs/common';

@Injectable()
export class MailPasswordHtml {
  public html = `<!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Signika+Negative:wght@300&display=swap" rel="stylesheet">
          <title>Forgot Password</title>
          <style>
              *{
                  font-family: 'Signika Negative', sans-serif;
              }
              h1, h2, h3{
                  margin-top: 0;
              }
              .btn{
                  background: #306eed;
                  border: 1px solid #306eed;
                  padding: 10px;
                  color: #fff !important;
                  border-radius: 5px;
                  cursor: pointer;
                  display: inline-block;
                  text-decoration: none;
                  margin: 0 auto;
              }
              .btn:hover{
                  background: #2a66df;
              }
              .btn:focus{
                  box-shadow: 0 0 0 3.5px #306fed6d;
              }
          </style>
      </head>
      <body style="margin: 0;">
          <main style="padding: 5%;">
              <div style="max-width: 1300px; margin: auto; border: 1px solid #ccc; border-radius: 20px;">
                  <div class="head" style="padding: 15px 30px; border-radius: 20px 20px 0 0; border-bottom: 1px solid #ccc;">
                      <img width="50px" src="{{url}}/assets/img/logo.png" alt="logo"> 
                  </div>
                  <div style="padding: 30px;">
                      <h2 style=" text-align: center;">¿Olvidaste tu contraseña?</h2>
                      <span style="font-size: 18px;">Hola, {{name}}</span>
                      <p style="margin-top: 5px;">Has hecho una solicitud para recuperar tu contraseña. Para recuperarla presiona el botón que te llevara al enlace de recuperación de contraseña.</p>
                      <div style="text-align: center; margin: 30px 0;">
                          <a href="{{url}}/auth/reset-password?token={{token}}" class="btn">Recuperar contraseña</a>
                      </div>
                      <p>
                          <b>Aviso!</b> este enlace expirará luego de haber ingresado.
                      </p>
                      <p style="margin: 0;">
                          Si necesitas asistencia puedes contactarte con nosotros <a href="#">info@Fadu.com</a>
                      </p>
                  </div>
                  <div style="background: #306eed; padding: 20px 30px; color: #fff; border-radius: 0 0 20px 20px;">
                      <span><b>Enviado por: </b> Fadu | {{date}}</span>
                  </div>
              </div>
          </main>
      </body>
  </html>`
}
