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
  orange: 1, // par défaut 1, mais 2 si paire
  jaune: -1,
  bleu: 0,
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

  // si la couleur est rose, on retire le dé de plus petite valeur
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

  // pour chaque dé de l'équipe on calcule sa valeur
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
  
  // Pour chaque dé orange, on ajoute 1 si impair, 2 si pair
  const orangeImpact = orangeCount % 2 === 0 ? 2 : 1;
  teamPower += orangeCount * orangeImpact;
  noRose.push(...Array(orangeCount).fill(orangeImpact));

  // Si l'équipe contient un dé rose, on retire le dé de plus petite valeur
  if (equipe.some((de) => de.couleur === "rose")) {
    const smallestDice = Math.min(...noRose);
    teamPower -=
      smallestDice * noRose.filter((value) => value === smallestDice).length;
  }

  return teamPower;
}
