### Wymagania do uruchomienia aplikacji:
- Node.js: v16.18.0 (brak danych na temat działania aplikacji na innych wersjach)
- Npm: v9.7.1 (brak danych na temat działania aplikacji na innych wersjach)
- połączenie z internetem

### Uruchamianie aplikacji
W celu uruchomienia aplikacji należy otworzyć terminal w folderze zawierającym aplikacje. Przy pierwszym uruchomieniu aplikacji należy pobrać moduły, z których korzysta aplikacja. W tym celu należy wywołać polecenie: 

`$ npm install`

Następnie aplikację można uruchomić komendą: 

`$ npm start`

Aplikacja będzie dostępna po wejściu w przeglądarke i wpisaniu adresu: http://localhost:3000. 

Testy jednostkowe można uruchomić poleceniem:

`$ npm run test -- --coverage --watchAll`