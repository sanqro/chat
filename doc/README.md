# Dokumentation - Private Chatting App

### Inhaltsverzeichnis

- [Dokumentation - Private Chatting App](#dokumentation---private-chatting-app)
    - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [Einführung](#einführung)
  - [IPERKA](#iperka)
    - [Informieren](#informieren)
      - [Einleitung](#einleitung)
      - [Technologien](#technologien)
      - [Quellen](#quellen)
    - [Planen](#planen)
    - [Entscheiden](#entscheiden)
    - [Verschlüsselung der Benutzerdaten](#verschlüsselung-der-benutzerdaten)
    - [Login / Registrierung für Benutzer](#login--registrierung-für-benutzer)
    - [Anzeigen neuer Nachrichten](#anzeigen-neuer-nachrichten)
    - [Realisieren](#realisieren)
    - [Kontrollieren](#kontrollieren)
    - [Auswerten](#auswerten)
  - [Lokale Entwicklungsumgebung](#lokale-entwicklungsumgebung)
  - [Anforderungen](#anforderungen)
  - [Testen](#testen)
    - [Testfälle](#testfälle)
    - [Testprotokoll](#testprotokoll)
    - [Testbericht](#testbericht)
  - [Frontend](#frontend)
    - [Wireframe](#wireframe)
    - [Features](#features)
  - [Backend](#backend)
    - [Host](#host)
    - [API Enpoints](#api-enpoints)

## Einführung

## IPERKA

### Informieren

#### Einleitung

Für dieses Projekt haben wir uns dafür entschieden, dass wir eine Chattingapplikation realisieren, bei der die Privatsphäre der Nutzer im Zentrum steht. Die Nachrichten dessen sollen deshalb mit einer "Ende zu Ende (E2E) Verschlüsselungsmethode verschlüsselt werden.

#### Technologien

Um unsere Chattingapplikation zu realisieren haben wir uns dazu entschieden die folgenden drei Technologien zu verwenden:

- [Node](https://nodejjs.org/en/about/)
- [Express](https://expressjs.com/de/)
- [React](https://reactjs.org)
- [TypeScript(tsx)](https://www.typescriptlang.org)

#### Quellen

Bitte hier die Quellen auflisten, welche wir für das Projekt benötigt haben.

### Planen

### Entscheiden

### Verschlüsselung der Benutzerdaten

Für die Verschlüsselung der Nachrichten werden den öffentlichen Schlüssel des anderen Benutzers im Chatraum verwenden. Um später die Nachrichten des anderen wieder zu entschlüsseln, werden wir den privaten Schlüssel des Benutzer, der die Nachrichten anschauen möchte.

### Login / Registrierung für Benutzer

Nach langen Überlegungen haben wir uns dazu entschieden, dass wir für das Login der Benutzer einen Benutzernamen sowie einen privaten Schlüssel für die Authentifizierung des Benutzers zu verwenden.

Jedoch haben wir uns dazu geeignet, dass ein Benutzer bei der Registrieung nur einen Benutzernamen angeben und muss ihm dann automatisch ein Schlüsselpaar generiert wird. Damit er sich später wieder anmelden kann, soll ihm der private Schlüssel angezeigt und ihm vorgeschlagen werden, dass er den Schlüssel an einem sicheren Ort speichert.

Damit die Verschlüsselung der Nachrichten nicht obsolet wird, weil wir die (verschlüsselten) Nachrichten der Benutzer in einer Datenbank und den privaten Schlüssel in einer nicht relationalen Datenbank speichern werden, haben wir uns dafür entschieden, nur einen Hashwert des privaten Schlüssels in der Datenbank zu speichern.

### Anzeigen neuer Nachrichten

Wir haben uns bewusst dagegen entschieden einen [Websocket](https://de.wikipedia.org/wiki/WebSocket) für das Anzeigen der neuen Nachricht zu verwenden, da Deta (dies ist der Anbieter, wo wir unsere API und Datenbank hosten) die Erhaltung dessen nicht genug lange unterstützt.

Deshalb werden wir eine optionale und konstante Abfrage bei der API verwenden, um zu prüfen ob es neue Nachrichten gibt.

### Realisieren

### Kontrollieren

### Auswerten

## Lokale Entwicklungsumgebung

## Anforderungen

| Anf.-Nr. | Muss/<br />Kann | funk./<br />qual. | Beschreibung                                                            |
| :------- | --------------- | ----------------- | ----------------------------------------------------------------------- |
| 1        | M               | funk.             | Alle Buttons sind funktionsfähig und sind an den richtigen Ort verlinkt |

## Testen

### Testfälle

| Testf.-Nr. | Anf-Nr. | Vorbereitung | Testumgebung                 | Eingabe                 | Erw. Ausgabe                                              |
| :--------: | ------- | :----------- | ---------------------------- | ----------------------- | --------------------------------------------------------- |
|    1.1     | 1       |              | Deployte Webseite im Browser | Alle Buttons anklicken. | Man wird immer auf die ensprechende Seite weitergeleitet. |

### Testprotokoll

### Testbericht

## Frontend

### Wireframe

![Wireframe-Anzeige](./wireframe.png "Wireframe")

### Features

## Backend

### Host

### API Enpoints
