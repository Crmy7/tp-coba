// src/modules/coba.ts

export type De = {
  couleur: Color;
  valeur?: number;
  equipe?: string;
};

export type Color = "vert" | "gris" | "orange" | "jaune" | "bleu" | "rose";

const colors: Record<Color, number> = {
  vert: 1,
  gris: 2,
  orange: 1, // Le calcul pour Orange sera traité séparément
  jaune: -1,
  bleu: 0, // Le calcul pour Bleu sera traité séparément
  rose: 3,
};

export function getValueByColor(
  couleur: Color,
  des: De[],
  autresDes: De[]
): number {
  if (couleur === "vert" || couleur === "gris" || couleur === "jaune") {
    return colors[couleur];
  }

  if (couleur === "orange") {
    const nbDesGroupe = des.filter((d) => d.couleur === "orange").length;
    return nbDesGroupe % 2 === 0 ? 2 : 1;
  }

  if (couleur === "bleu") {
    return autresDes.length;
  }

  if (couleur === "rose") {
    const minValeur = Math.min(
      ...des.map((d) => getValueByColor(d.couleur, des, autresDes))
    );
    des.forEach((d) => {
      if (getValueByColor(d.couleur, des, autresDes) === minValeur) {
        d.valeur = 0;
      }
    });
    return 3;
  }

  throw new Error("Couleur de dé inconnue");
}

export function getTeamScore(equipe: De[], autresDes: De[]): number {
  let teamPower = 0;
  let orangeCount = 0;
  let noRose: number[] = [];
  const blueCount = autresDes.length;

  equipe.forEach((de) => {
    if (de.couleur === "orange") {
      orangeCount += 1;
    } else if (de.couleur === "bleu") {
      teamPower += blueCount;
      noRose.push(blueCount);
    } else {
      const value = getValueByColor(de.couleur, equipe, autresDes);
      teamPower += value;
      noRose.push(value);
    }
  });

  const orangeImpact = orangeCount % 2 === 0 ? 2 : 1;
  teamPower += orangeCount * orangeImpact;
  noRose.push(...Array(orangeCount).fill(orangeImpact));

  if (equipe.some((de) => de.couleur === "rose")) {
    const lowestValueDice = Math.min(...noRose);
    teamPower -=
      lowestValueDice *
      noRose.filter((value) => value === lowestValueDice).length;
  }

  return teamPower;
}
