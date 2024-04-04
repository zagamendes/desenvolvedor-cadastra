export function removeDuplicatedQueryParams(url: string) {
  const palavras = url.split("&");

  const palavrasUnicas = new Set(palavras);

  const palavrasSemDuplicatas = Array.from(palavrasUnicas);

  const fraseSemDuplicatas = palavrasSemDuplicatas.join("&");

  return fraseSemDuplicatas;
}
