const admin = require('firebase-admin');

// firebase service account pk
const type = "service_account";
const project_id = "capstone-bank";
const private_key_id = "fff8288367f7adeff38b661ab02d7f3a919e434c";
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDI89raDXJWLv/n\nAXbhJTrsZXymeuc8oFm8nrhLTVmegQButtkTy2IPMcj4Nbf/c4XS2ogFG3cx+q+S\nz5k9Me2Hld4K0+Ikhc60HKgB+NEvIDz11LoPGhyBtyEKgkEVX3rhZMcX0/0+hefB\nfbFwIkq6t/1Q7dbLwmwC8WxdWwrHPBQ30paQIImQcs+FDPKvQA5AjGeYiu42RHNq\ndS6j7TGKbdH56JPANRopcphxnqGMYJdpPZtAgoM/vedStaMHMCsCVw+J9vRDLvjf\nwZHee965A5Dt5ozdspwgAqdcOSYgFBmOUmxcLrmLcIiPJeEHjQ7OuzOZcZLdl87N\nwoGOdgv3AgMBAAECggEAWsqidKZipEGz6QEmXu7dQnVP7j/VPfUM1kW36n3WIeES\n+vKt/V2Evmy16j8LFOVy7yNBFV2lavViYihdieKG+R1jJu04XVv/Wi0gU1PB31Ln\neAJW1f/sJUdCLGdRVIDBGhjYQxHKd3c0kJ1jj9BOhzIdx3TN+V2sQ2Akn8FEi2Lx\nqJyeAcCr1OEtfa3FUkyfSOpUmt+zCP2fet+W3LI7DD4x1abzlcb95jtrKyVgUU7g\nF9jjaMGuMUSsesuhi3db28vLm5ww6mQElRaPty/XuC4GTdGcGHMHwwzB2VzcS4b0\nFentVbYLrGrX7YXMjo8pAii+9v3eYsz01yp4V6z90QKBgQD6GlovT0JDE4bwrDq/\nYyAstjdmS6GCLGMdB7u6eu/US4amb97RCYtQY1bTzRXuVrBsYJpr7LeL8FGfqz7A\nc6CYC+vW2hksOsN37zwt6MnOlqLR6kxllHUgXiA/KJhQVJr3yJsKDLyCCXU5DFlT\nZu3p8Mm8Qzhi6zVkeIhuUSlguwKBgQDNsNNiuEb2HwUhTtMJ/Mq094xXhcNzZhcB\njKoMojpaeZjFGx+6MygfUkdmUBzFexpgnRxV0jfyJjFRdodTiDFKI2WbW28Tsf06\nRu8RoyZkYMj1Iz8Lp2HlvGpyzOBVEukhzKZtd2l9bi2x5WohLB1BHBuuoxx9Jbp7\n3YqWos5b9QKBgG1QuVx2UysITPHDBcaDaBvC5UIECqrgBc45hBdFBrCO9mKnAQfz\nGP5g/SGEQXK0V1Z3fudvRuaWesbETaBGqcnrZAC7wUbwxGEWowIZ/qMaej4wH4ZC\ntlMYcRXKA5EQ+c8V0pY47OgVhDQULrLiiVi4UyTDaNDrp6GrgU5ekSxjAoGAXOEA\nwq4FVPOy5FRslTDx839ofsjm9b/emZOD4cqLYPlRU4eo7vJUprgHh5qbM00gHwoy\nlkojexNl56wG9WAlKZ4MLne+E32mo98N6r/qAR92/sJYoJGHci5/PrFmhuPQI7P+\nXqWyG7JZrd+y6aG64ACqO1Rp89TKfU4PW2/OkNUCgYEAyD35NhElT9hBenDkbBGB\nCrCP1Z8rGW+bwPVTnmGgtyf4sKNyIlFIwSoJk6rbZxeSvRkEBbGA5ZZ2xGcpq4g6\nXPnxD9Ya8gnBnNpwMFZlwqWLuMeTBgvYBVVDFfNM0ik9FDayKlqW2JmD2sSaBcbY\njTUcvTkAFdiGjwHUWIPaIAM=\n-----END PRIVATE KEY-----\n";
const client_email = "firebase-adminsdk-l61yz@capstone-bank.iam.gserviceaccount.com";
const client_id = "113850685703212745901";
const auth_uri = "https://accounts.google.com/o/oauth2/auth";
const token_uri = "https://oauth2.googleapis.com/token";
const auth_provider_x509_cert_url = "https://www.googleapis.com/oauth2/v1/certs";
const client_x509_cert_url = "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uzp33%40fullstack-senthil.iam.gserviceaccount.com";


// credential grants access to Firebase services
admin.initializeApp({
  credential: admin.credential.cert({
      type,
      project_id,
      private_key_id,
      private_key:
        private_key.replace(/\\n/g,'\n'),
      client_email,
      client_id,
      auth_uri,
      token_uri,
      auth_provider_x509_cert_url,
      client_x509_cert_url
  }),
});

module.exports = admin;