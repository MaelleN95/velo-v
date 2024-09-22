# Simulation d'application de réservation de vélos en libre-service

## Sommaire

* [Description](#description)
* [Fonctionnalités](#fonctionnalités)
* [Installation](#installation)
* [Structure du projet](#structure-du-projet)
* [Technologies utilisées](#technologies-utilisées)
* [Note de synthèse](#note-de-synthèse)
  * [Spécifications fonctionnelles](#spécifications-fonctionnelles)
  * [Spécifications techniques](#spécifications-techniques)
* [Screenshots](#screenshots)
* [Auteur](#auteur)

## Description

Ce projet est un exercice pratique visant à développer une interface web pour la consultation et la réservation de vélos en libre-service. Bien que l'exercice original ne soit plus disponible en ligne, l'application reste entièrement fonctionnelle et constitue un bon exemple d'intégration d'API externe et de manipulation de la carte interactive avec JavaScript.

L'application permet d'afficher des stations de vélos sur une carte, de consulter la disponibilité des vélos et de simuler une réservation. Ce projet a été réalisé dans le cadre de ma formation en développement web et se concentre sur la manipulation de JavaScript côté client.

## Fonctionnalités

- Affichage d'une carte interactive avec les stations de vélos en libre-service (via l'API JCDecaux)
- Consultation des informations en temps réel sur la disponibilité des vélos dans chaque station
- Possibilité de simuler la réservation d'un vélo pour une durée limitée

## Installation

1. Clonez le repository :
   ```bash
   git clone https://github.com/MaelleN95/velo-v.git
2. Ouvrez le fichier `index.html` dans votre navigateur.

Aucune dépendance supplémentaire n'est requise pour ce projet, il peut être exécuté directement dans un navigateur.

## Structure du projet

- `index.html` : Le fichier HTML principal
- `css/` : Les fichiers CSS
- `js/` : Les fichiers JavaScript
- `images/` : Contient les images utilisées pour la mise en page

## Technologies utilisées

- HTML5
- CSS3
- JavaScript
- [Leaflet](https://leafletjs.com/) (pour la carte interactive)
- [API JCDecaux](https://developer.jcdecaux.com/#/opendata/vls?page=getstarted) (pour récupérer les données des stations de vélos)

## Note de synthèse

### Spécifications fonctionnelles

| Fonctionnalités                | Description                                                                                                 |
|--------------------------------|-------------------------------------------------------------------------------------------------------------|
| **Affichage des stations**     | L'application affiche toutes les stations de vélos disponibles sur une carte interactive.                   |
| **Disponibilité des vélos**    | L'utilisateur peut consulter en temps réel le nombre de vélos et de places disponibles dans chaque station. |
| **Réservation simulée**        | L'utilisateur peut réserver un vélo pour une durée limitée (simulation sans backend réel).                  |

### Spécifications techniques

| Critères techniques                      | Détails                                                     |
|----------------------------|-----------------------------------------------------------------------------|
| **JavaScript ES6**          | Utilisation de classes, des promesses et des modules JavaScript.    |
| **API JCDecaux**            | Récupération des données des stations de vélos via une API publique JCDecaux. |
| **Carte interactive**       | Utilisation de la bibliothèque Leaflet pour afficher les stations sur une carte. |
| **Gestion des événements**  | Utilisation d'événements JavaScript pour capturer les actions de l'utilisateur (sélection de station, réservation). |

## Screenshots

*A venir...*

## Auteur

- [Maëlle Nioche](https://www.linkedin.com/in/maelle-nioche/)
