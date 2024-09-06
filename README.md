# HETIC Projet Final: “ Tech-Race “ - App Mobile

<img src="https://img.shields.io/badge/React Native-%5E0.74.1-green">
<img src="https://img.shields.io/badge/React-18.2.0-purple">

<div align="center">
   <img src="https://github.com/NasssDev/Tech-Race/assets/167258734/8022059e-d34b-422f-9010-bf8d8fdd7132" alt="image" width="300" height="200"/>
</div>

## Description du Projet

Le projet final HETIC, "Tech Race", vise à développer une application mobile permettant de contrôler un véhicule à distance via un réseau sans fil. L'application offre aux utilisateurs la possibilité de piloter le véhicule, d'accéder aux données de télémétrie en temps réel et de participer à des courses autonomes.

Ce projet se compose de plusieurs repositories toutes hébergés sur Github :
- [API Tech Race](https://github.com/NasssDev/Tech-Race)
- [App Mobile (ce repository)](https://github.com/Hetic-Team/tech_race_8_2024)
- [Programme de la voiture](https://github.com/ExploryKod/freenove_esp32_wrover)
- [Modèle de la voiture](https://www.amazon.fr/Freenove-ESP32-WROVER-Contained-Compatible-Expressions/dp/B08X6PTQFM/ref=sr_1_5?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1NFTVTE5M400B&dib=eyJ2IjoiMSJ9.ouyBflLDqHVkfViARMLD6Bn9gOI47kLGrM-5LMAbtJPAUgPogSQ1tQyH60VxNGSHTf-JIYDTkVL4RJ2a7-L92dQ5aqD8IliDd4MzLvffNmw65QxSItZh_qi-vPHXgzjBhvcW8Vy00EckrayFx_47OCj3W4K6Y1W0jHZgIDF7DAvRTI9XcC7oRK8T9xeUORe35q6RJ29TNUuhLCcN5fXl-WqLhsgNb2JA0XzHwnqwHaBBwj-xZ77ohEfVpUYfdyOMWf1wO01Fa42MzKl0b-UGD6PwYD-kBCJYQS3J9twWSGs.OrlAkZRIvlaYtQ2-9pywcADOLR7VY4iRx_9Ps1DkMnk&dib_tag=se&keywords=esp32+car&qid=1715602634&sprefix=esp+32+car,aps,125&sr=8-5)

## Equipe Backend :

- [Amaury FRANSSEN](https://github.com/ExploryKod)
- [Nassim AISSAOUI](https://github.com/NasssDev)
- [Justin LELUC](https://github.com/Jykiin)

## Equipe frontend (ce repository) :
- [Reewaz Maskey](https://github.com/reewaz001)
- [Alexandre VISAGE](https://github.com/Aleex470)
- [Khalifa boubacar DIONE](https://github.com/khalifadione)
- [Amaury FRANSSEN](https://github.com/ExploryKod)
- [Achraf CHARDOUDI](https://github.com/Achkey)

## 🎯 Objectif

L'objectif principal est de créer une interface intuitive pour les pilotes afin de contrôler le véhicule et de visualiser ses performances. Deux niveaux de courses sont organisés : l'un où les pilotes contrôlent directement le véhicule depuis l'application mobile, et l'autre où le véhicule doit naviguer de manière autonome en suivant une ligne au sol.

## 💻 Fonctionnalités Principales de l'app

- Contrôle à distance du véhicule via l'application mobile.
- Visualisation des données de télémétrie (distances à obstacles, orientation, etc.).
- Contrôle manuel ou pilotage automatique
- Contrôle via la voix en donnant des commandes à l'app
- Mode suiveur de ligne autonome pour les courses sans intervention humaine.
- Visualisation des vidéos prises par la voiture en roulant avec Cloudinary comme service de stockage.

# 🧮 Installation de l'app mobile en local

## **Important avant de commencer**: 

Vous ne pouvez utiliser l'app mobile que si vous avez déjà installé et démarré l'API Tech Race en local, voir [sur ce repository](https://github.com/NasssDev/Tech-Race).

>**Note**: Vous devez avoir complétez ces étapes avant d'en lire plus : [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) (Jusqu'à "Creating a new application").

## 1: Installation des dépendances

**1.1 Dans Android Studio :** 
- Assurez-vous d'avoir bien suivi l'installation décrite dans le lien ci-dessus en fonction de votre OS
- Assurez-vous d'avoir installé des Emulateurs, nous utilisons par exemple celui-ci qui marche bien : `Pixel 6a API 34`
- Nous utilisons ce SDK : `Android 14.0 "UpsideDownCake"` avec les packages `Android SDK Plateform 34` et `Source for Android 34`
- Nous utilisons également `Android API 35` avec tous les packages rattachés installés.
  
**1.2 Sur l'app :**

Nous utilisons `npm` et `React native cli` (et non `expo`) pour cette application. 

Installer les dépendances : 
```bash
# using npm
npm install
```

Si vous avez des problème d'incompatibilité entre dépendances, tenter le passage en force avec : 
```bash
# using npm
npm install --legacy-peer-deps
```
Cette solution temporaire peut au moins permettre de démarrer l'app mais ne garantie pas une navigation sans heurt.

## 2: Démarrage du Serveur Metro

Démarrer votre Emulateur (sur Android Studio) avant d'aller plus loin.

Vous devez démarrer **Metro**, le JavaScript _bundler_ .

Pour démarrer Metro, utilisez cette commandes : 

```bash
# using npm
npm start
```

```bash
# En cas de problème de dépendances incompatibles
npm i --legacy-peer-deps
```

## 3: Démarrage de l'application (sur Emulateur)

3.1 Première méthode : appuyer sur la touche `a` dans le même terminal que précèdement pour démarrer un émulateur Android.

3.2 2ème méthode si la première échoue:

Ouvrez un _nouveau_ terminal à la racine. Démarrez votre app Android:

### For Android

```bash
# using npm
npm run android

```

### For iOS

Ce projet n'est pas configurer pour fonctionner sous iOs. Nous y travaillons.

L'émulateur Android doit normalement démarrer.

### Et aprés ?

- Pour intégrer ce code à une application existante, allez ici : [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- Pour affûter votre intérêt pour React Native, visitez : [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

Pour débugguer, visitez : [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.


# Contribuer

Les contributions sont les bienvenues ! Pour contribuer à ce projet, veuillez suivre ces étapes :
1. Forker le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commiter vos modifications (`git commit -m 'Ajouter une fonctionnalité incroyable'`)
4. Pousser vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request


# En savoir plus

Pour en savoir plus (sources en anglais) :

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
