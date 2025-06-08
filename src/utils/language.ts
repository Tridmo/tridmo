export const getLanguageByDomain = () => {
  if (typeof window === 'undefined') return 'ru';
  
  const hostname = window.location.hostname;
  if (hostname.endsWith('.uz')) {
    return 'uz';
  }
  return 'ru';
};

export const translations = {
  ru: {
    title: "МЫ СОЗДАЕМ ДЛЯ ВАС КАЧЕСТВЕННЫЕ 3D МОДЕЛИ",
    description: "Dizipro создает первоклассные 3D-модели с помощью нашей опытной команды специалистов",
    button: "Dizipro.org"
  },
  uz: {
    title: "BIZ SIZGA YUQORI SIFATLI 3D MODELLARNI YARATAMIZ",
    description: "Dizipro bizning tajribali frilanserlar jamoamiz yordamida onlayn sifatli 3D modellarni yaratadi.",
    button: "Dizipro.org"
  }
}; 