export const RegexSpecialCharacter = /^(?=.*[^\W_])[\w ]*$/

export function specialCharactersCheck(str: string) {
  return RegexSpecialCharacter.test(str)
}
