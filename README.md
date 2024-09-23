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

Ce projet est un exercice pratique visant à développer une interface web pour la consultation et la réservation de vélos en libre-service.

L'application permet d'afficher des stations de vélos sur une carte, de consulter la disponibilité des vélos et de simuler une réservation. Ce projet se concentre sur la manipulation de JavaScript côté client.

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
- `assets/` : Contient les images utilisées pour la mise en page

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
| **Carte interactive des stations**| La carte permet une navigation fluide. Les utilisateurs peuvent zoomer et cliquer sur les marqueurs pour voir les détails des stations. |

### Spécifications techniques

| Critères techniques                      | Détails                                                     |
|----------------------------|-----------------------------------------------------------------------------|
| **JavaScript ES6**                | Utilisation de classes, des promesses et des modules JavaScript pour structurer le code. |
| **[API JCDecaux](https://developer.jcdecaux.com/#/opendata/vls?page=getstarted)**                  | Récupération des données des stations de vélos via une API publique JCDecaux. L'API retourne en temps réel les informations concernant chaque station (nom, vélos disponibles, places disponibles, statut de la station). |
| **Carte interactive ([Leaflet.js](https://leafletjs.com/))**| Utilisation de la bibliothèque Leaflet pour afficher les stations de vélos sur une carte interactive. Leaflet gère les interactions avec la carte (zoom, déplacement, affichage des marqueurs). |
| **Gestion des événements JavaScript** | Utilisation d'événements JavaScript pour capturer les interactions de l'utilisateur : sélection de station, réservation de vélo, validation de la signature, etc. |
| **HTML5 Canvas**                  | Intégration d'un plugin de signature basé sur le Canvas HTML5 pour permettre à l'utilisateur de signer lors de la réservation d'un vélo. |
| **Manipulation du DOM**           | Le JavaScript est utilisé pour manipuler dynamiquement le DOM, mettre à jour les éléments de la page en fonction des actions de l'utilisateur et des données API. |
| **Diaporama interactif**          | Le diaporama est réalisé en JavaScript avec des transitions animées. La logique du diaporama doit être écrite par le développeur. Il affiche plusieurs diapositives qui peuvent contenir des images, du texte ou des informations relatives aux stations. Le diaporama passe automatiquement d'une diapositive à l'autre après un délai configurable. L'utilisateur peut également utiliser les contrôles de navigation manuelle ("Précédent", "Pause", "Suivant"). |
| **Débogage**                      | Le code doit être proprement commenté, structuré et compatible avec les outils de développement pour faciliter le débogage. |
| **Contrôle des erreurs**          | Gestion des erreurs côté client (par exemple, si l'API ne répond pas ou si une réservation échoue, un message d'erreur est affiché). |

## Screenshots

*A venir...*

## Auteur

- [Maëlle Nioche](https://www.linkedin.com/in/maelle-nioche/)
