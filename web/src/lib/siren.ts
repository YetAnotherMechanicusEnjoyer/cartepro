/**
 * Un SIREN valide fait 9 chiffres ET respecte la clé de Luhn (comme le
 * backend, voir src/api/auth.rs::is_valid_siren) — un simple "9 chiffres"
 * laisse passer des numéros mal saisis.
 */
export function isValidSiren(siren: string): boolean {
  if (!/^\d{9}$/.test(siren)) {
    return false
  }

  const digits = siren
    .split("")
    .reverse()
    .map((d) => Number(d))

  const sum = digits.reduce((acc, digit, index) => {
    if (index % 2 === 1) {
      const doubled = digit * 2
      return acc + (doubled > 9 ? doubled - 9 : doubled)
    }
    return acc + digit
  }, 0)

  return sum % 10 === 0
}
