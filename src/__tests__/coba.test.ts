// src/__tests__/coba.test.ts
import { getValueByColor, getTeamScore, De } from "../modules/coba";
import { expect, describe, it } from "vitest";

// Définir toutes les combinaisons possibles de dés
const allDice: De[] = [
  { couleur: "vert" },
  { couleur: "gris" },
  { couleur: "orange" },
  { couleur: "jaune" },
  { couleur: "bleu" },
  { couleur: "rose" },
];

describe("Test des valeurs des dés par couleur", () => {
  describe("Dé vert", () => {
    it("calculer la valeur d'un dé vert", () => {
      const valeur = getValueByColor("vert", [], []);
      expect(valeur).toBe(1);
    });
  });

  describe("Dé gris", () => {
    it("calculer la valeur d'un dé gris", () => {
      const valeur = getValueByColor("gris", [], []);
      expect(valeur).toBe(2);
    });
  });

  describe("Dé orange", () => {
    it("calculer la valeur d'un dé orange avec nombre impair", () => {
      const valeur = getValueByColor("orange", [{ couleur: "orange" }], []);
      expect(valeur).toBe(1);
    });

    it("calculer la valeur d'un dé orange avec nombre pair", () => {
      const valeur = getValueByColor(
        "orange",
        [{ couleur: "orange" }, { couleur: "orange" }],
        []
      );
      expect(valeur).toBe(2);
    });
  });

  describe("Dé jaune", () => {
    it("calculer la valeur d'un dé jaune", () => {
      const valeur = getValueByColor("jaune", [], []);
      expect(valeur).toBe(-1);
    });
  });

  describe("Dé bleu", () => {
    it("calculer la valeur d'un dé bleu", () => {
      const valeur = getValueByColor(
        "bleu",
        [],
        [{ couleur: "bleu" }, { couleur: "bleu" }]
      );
      expect(valeur).toBe(2);
    });
  });

  describe("Dé rose", () => {
    it("calculer la valeur d'un dé rose et passer les dés de valeur la plus faible à 0", () => {
      const desAvecValeurs: De[] = [
        { couleur: "rose" },
        { couleur: "gris" },
        { couleur: "jaune" },
      ];
      const valeur = getValueByColor("rose", desAvecValeurs, []);
      expect(valeur).toBe(3);
      expect(desAvecValeurs[2].valeur).toBe(0);
    });
  });
});

describe("Test des scores d'équipe", () => {
  describe("Combinaisons de deux dés", () => {
    it("calculer le score d'une équipe avec vert et gris", () => {
      const equipe: De[] = [{ couleur: "vert" }, { couleur: "gris" }];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(3); // 1 (vert) + 2 (gris)
    });

    it("calculer le score d'une équipe avec vert et orange", () => {
      const equipe: De[] = [{ couleur: "vert" }, { couleur: "orange" }];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(2); // 1 (vert) + 1 (orange)
    });

    it("calculer le score d'une équipe avec vert et jaune", () => {
      const equipe: De[] = [{ couleur: "vert" }, { couleur: "jaune" }];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(0); // 1 (vert) + (-1) (jaune)
    });

    it("calculer le score d'une équipe avec vert et bleu", () => {
      const equipe: De[] = [{ couleur: "vert" }, { couleur: "bleu" }];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(1); // 1 (vert) + 0 (bleu, pas d'autres dés adverses)
    });

    it("calculer le score d'une équipe avec vert et rose", () => {
      const equipe: De[] = [{ couleur: "vert" }, { couleur: "rose" }];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(3); // 0 (vert) + 3 (rose)
    });

    it("calculer le score d'une équipe avec gris et orange", () => {
      const equipe: De[] = [{ couleur: "gris" }, { couleur: "orange" }];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(4); // 2 (gris) + 2 (orange)
    });

    it("calculer le score d'une équipe avec gris et jaune", () => {
      const equipe: De[] = [{ couleur: "gris" }, { couleur: "jaune" }];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(1); // 2 (gris) + (-1) (jaune)
    });

    it("calculer le score d'une équipe avec gris et bleu", () => {
      const equipe: De[] = [{ couleur: "gris" }, { couleur: "bleu" }];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(2); // 2 (gris) + 0 (bleu, pas d'autres dés adverses)
    });

    it("calculer le score d'une équipe avec gris et rose", () => {
      const equipe: De[] = [{ couleur: "gris" }, { couleur: "rose" }];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(3); // 0 (gris) + 3 (rose)
    });

    it("calculer le score d'une équipe avec orange et jaune", () => {
      const equipe: De[] = [{ couleur: "orange" }, { couleur: "jaune" }];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(1); // 2 (orange) + (-1) (jaune)
    });

    it("calculer le score d'une équipe avec orange et bleu", () => {
      const equipe: De[] = [{ couleur: "orange" }, { couleur: "bleu" }];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(2); // 2 (orange) + 0 (bleu, pas d'autres dés adverses)
    });

    it("calculer le score d'une équipe avec orange et rose", () => {
      const equipe: De[] = [{ couleur: "orange" }, { couleur: "rose" }];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(3); // 0 (orange) + 3 (rose)
    });

    it("calculer le score d'une équipe avec jaune et bleu", () => {
      const equipe: De[] = [{ couleur: "jaune" }, { couleur: "bleu" }];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(-1); // -1 (jaune) + 0 (bleu, pas d'autres dés adverses)
    });

    it("calculer le score d'une équipe avec jaune et rose", () => {
      const equipe: De[] = [{ couleur: "jaune" }, { couleur: "rose" }];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(3); // -1 (jaune) + 3 (rose)
    });

    it("calculer le score d'une équipe avec bleu et rose", () => {
      const equipe: De[] = [{ couleur: "bleu" }, { couleur: "rose" }];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(3); // 0 (bleu, pas d'autres dés adverses) + 3 (rose)
    });
  });

  describe("Combinaisons de trois dés", () => {
    it("calculer le score d'une équipe avec vert, gris, et orange", () => {
      const equipe: De[] = [
        { couleur: "vert" },
        { couleur: "gris" },
        { couleur: "orange" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(4); // 1 (vert) + 2 (gris) + 1 (orange)
    });

    it("calculer le score d'une équipe avec vert, gris, et jaune", () => {
      const equipe: De[] = [
        { couleur: "vert" },
        { couleur: "gris" },
        { couleur: "jaune" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(2); // 1 (vert) + 2 (gris) + (-1) (jaune)
    });

    it("calculer le score d'une équipe avec vert, gris, et bleu", () => {
      const equipe: De[] = [
        { couleur: "vert" },
        { couleur: "gris" },
        { couleur: "bleu" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(3); // 1 (vert) + 2 (gris) + 0 (bleu, pas d'autres dés adverses)
    });

    it("calculer le score d'une équipe avec vert, gris, et rose", () => {
      const equipe: De[] = [
        { couleur: "vert" },
        { couleur: "gris" },
        { couleur: "rose" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(5); // 1 (vert) + 2 (gris) + 3 (rose) et le dé vert est à 0
    });

    it("calculer le score d'une équipe avec vert, orange, et jaune", () => {
      const equipe: De[] = [
        { couleur: "vert" },
        { couleur: "orange" },
        { couleur: "jaune" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(2); // 1 (vert) + 2 (orange) + (-1) (jaune)
    });

    it("calculer le score d'une équipe avec vert, orange, et bleu", () => {
      const equipe: De[] = [
        { couleur: "vert" },
        { couleur: "orange" },
        { couleur: "bleu" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(3); // 1 (vert) + 2 (orange) + 0 (bleu, pas d'autres dés adverses)
    });

    it("calculer le score d'une équipe avec vert, orange, et rose", () => {
      const equipe: De[] = [
        { couleur: "vert" },
        { couleur: "orange" },
        { couleur: "rose" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(5); // 1 (vert) + 1 (orange) + 3 (rose)
    });

    it("calculer le score d'une équipe avec vert, jaune, et bleu", () => {
      const equipe: De[] = [
        { couleur: "vert" },
        { couleur: "jaune" },
        { couleur: "bleu" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(0); // 1 (vert) + (-1) (jaune) + 0 (bleu, pas d'autres dés adverses)
    });

    it("calculer le score d'une équipe avec vert, jaune, et rose", () => {
      const equipe: De[] = [
        { couleur: "vert" },
        { couleur: "jaune" },
        { couleur: "rose" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(3); // 1 (vert) + (-1) (jaune) + 3 (rose)
    });

    it("calculer le score d'une équipe avec vert, bleu, et rose", () => {
      const equipe: De[] = [
        { couleur: "vert" },
        { couleur: "bleu" },
        { couleur: "rose" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(4); // 1 (vert) + 0 (bleu, pas d'autres dés adverses) + 3 (rose)
    });

    it("calculer le score d'une équipe avec gris, orange, et jaune", () => {
      const equipe: De[] = [
        { couleur: "gris" },
        { couleur: "orange" },
        { couleur: "jaune" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(2); // 2 (gris) + 1 (orange) + (-1) (jaune)
    });

    it("calculer le score d'une équipe avec gris, orange, et bleu", () => {
      const equipe: De[] = [
        { couleur: "gris" },
        { couleur: "orange" },
        { couleur: "bleu" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(3); // 2 (gris) + 1 (orange) + 0 (bleu, pas d'autres dés adverses)
    });

    it("calculer le score d'une équipe avec gris, orange, et rose", () => {
      const equipe: De[] = [
        { couleur: "gris" },
        { couleur: "orange" },
        { couleur: "rose" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(6); // 2 (gris) + 1 (orange) + 3 (rose)
    });

    it("calculer le score d'une équipe avec gris, jaune, et bleu", () => {
      const equipe: De[] = [
        { couleur: "gris" },
        { couleur: "jaune" },
        { couleur: "bleu" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(1); // 2 (gris) + (-1) (jaune) + 0 (bleu, pas d'autres dés adverses)
    });

    it("calculer le score d'une équipe avec gris, jaune, et rose", () => {
      const equipe: De[] = [
        { couleur: "gris" },
        { couleur: "jaune" },
        { couleur: "rose" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(4); // 2 (gris) + (-1) (jaune) + 3 (rose)
    });

    it("calculer le score d'une équipe avec gris, bleu, et rose", () => {
      const equipe: De[] = [
        { couleur: "gris" },
        { couleur: "bleu" },
        { couleur: "rose" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(5); // 2 (gris) + 0 (bleu, pas d'autres dés adverses) + 3 (rose)
    });

    it("calculer le score d'une équipe avec orange, jaune, et bleu", () => {
      const equipe: De[] = [
        { couleur: "orange" },
        { couleur: "jaune" },
        { couleur: "bleu" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(0); // 1 (orange) + (-1) (jaune) + 0 (bleu, pas d'autres dés adverses)
    });

    it("calculer le score d'une équipe avec orange, jaune, et rose", () => {
      const equipe: De[] = [
        { couleur: "orange" },
        { couleur: "jaune" },
        { couleur: "rose" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(3); // 1 (orange) + (-1) (jaune) + 3 (rose)
    });

    it("calculer le score d'une équipe avec orange, bleu, et rose", () => {
      const equipe: De[] = [
        { couleur: "orange" },
        { couleur: "bleu" },
        { couleur: "rose" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(4); // 1 (orange) + 0 (bleu, pas d'autres dés adverses) + 3 (rose)
    });

    it("calculer le score d'une équipe avec jaune, bleu, et rose", () => {
      const equipe: De[] = [
        { couleur: "jaune" },
        { couleur: "bleu" },
        { couleur: "rose" },
      ];
      const score = getTeamScore(equipe, []);
      expect(score).toBe(2); // -1 (jaune) + 0 (bleu, pas d'autres dés adverses) + 3 (rose)
    });
  });
});
