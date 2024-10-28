type LanguageKey = "EN";

class Intl {
  private readonly data = {} as const satisfies Record<
    string,
    Record<LanguageKey, string>
  >;

  private language: LanguageKey = "EN";

  setLanguage = (language: LanguageKey): this => {
    this.language = language;

    return this;
  };

  getLocalized = (key: string): string => {
    return this.data[key as keyof typeof this.data]?.[this.language] ?? key;
  };
}

const INTL = new Intl();

export default INTL;
